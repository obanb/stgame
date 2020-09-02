import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import next from 'next';
import crypto from 'crypto';
import { AuthService } from './service';
import { ApiTokenResponse, EncodedToken, LoginErrorResponse } from './model';

import proxy from 'express-http-proxy';

require('dotenv').config();

declare const process: any;
const dev: boolean = process.env.NODE_ENV !== 'production';

// inicializace next.js aplikace

const app = next({ dev });
const handle = app.getRequestHandler();

export const { BACKEND_ENDPOINT } = process.env;

const SECRET = 'tajny-jwt-salt';

app.prepare()
    .then(() => {
        const server = express();
        // server.enable('trust proxy');

        server.use(bodyParser.json({ limit: '10mb' }));
        server.use(bodyParser.urlencoded({ extended: false }));

        server.use(cookieParser());

        server.get('/healthz', (_, res) => {
            // check my health
            // -> return next(new Error('DB is unreachable'))
            res.sendStatus(200);
        });

        server.use(
            '/api',
            proxy(process.env.BACKEND_ENDPOINT, {
                proxyReqOptDecorator: async (proxyReqOpts, srcReq) => {
                    try {
                        proxyReqOpts.headers.Authorization = `Bearer ${
                            (await AuthService.decodeToken(srcReq, SECRET)).token
                        }`;
                        return proxyReqOpts;
                    } catch (err) {
                        return proxyReqOpts;
                    }
                },
            }),
        );

        /**
         * Kontrola podle loginu a hesla
         * V pripade spravneho prihlaseni, vraci JWT token
         * Dale vraci i xsrfToken, ktery je pouzit pro prevenci pred CSRF utokem
         * FIXME: je dulezite pouzit komplikovanejsi 'jwtSecret' klic, ktery vice zapezpecuje ziskani tokenu hrubou silou
         */
        server.post('/authenticate', async (req, res) => {
            const { email, heslo, typ, requestId, token } = req.body;
            try {
                const response = await AuthService.loginWithEmailAndPassword(
                    BACKEND_ENDPOINT,
                    email,
                    heslo,
                    typ,
                    requestId,
                    token,
                );
                if ((response as LoginErrorResponse).error) {
                    res.status(401).json(response);
                } else {
                    const { token, expiresIn, email: emailFromResponse, userFullAccess } = response as ApiTokenResponse;

                    const safeEmail = email ? email : emailFromResponse;

                    // Sign token
                    const xsrfToken = crypto.createHash('SHA256').update(safeEmail).digest('hex');
                    const clientToken = jwt.sign({ token, email: safeEmail, xsrfToken } as EncodedToken, SECRET, {
                        expiresIn,
                    });

                    res.status(200).json({
                        success: true,
                        token: clientToken,
                        expiresIn: process.env.DEV_UNLIMITED_SESSION === 'true' ? expiresIn : undefined,
                        userFullAccess,
                    });
                }
            } catch (err) {
                res.status(401).json({ error: err.message });
            }
        });

        /**
         * Auth middleware
         * Middleware se aplikuje na vsechny routy, krome: ['/login', '/_next', ...]
         */
        // server.use(
        //     unless(['/login', '/nastaveniHesla', '/_next', '/static', '/_info'], async (req, res, next) => {
        //         try {
        //             req.decoded = await AuthService.decodeToken(req, SECRET);
        //             next();
        //         } catch (err) {
        //             // tslint:disable-next-line
        //             console.warn('Bad decode token: ', err);
        //             res.clearCookie('x-access-token');
        //             res.redirect(`/login?path=${encodeURI(req.path)}`);
        //         }
        //     }),
        // );

        /**
         * Vsechny routy, smerujici na domenu jsou obslouzeny Next.js
         * Diky explicitni konfiguraci je mozne definovat vlastni routy, ktere budou presmerovavat dane pozadavky na dane stranky
         */
        server.get('*', (req: any, res) => {
            return handle(req, res);
        });

        const PORT = process.env.PORT || 8081;
        server.listen(PORT, () => {
            // tslint:disable-next-line
            console.log(`Server is ready on PORT=${PORT}`);
        });
    }) // eslint-disable-next-line
    .catch((e: any) => console.warn(`Server failed: ${e}`));

// type MiddlewareType = (req: Request & { decoded?: any }, res: Response, next: NextFunction) => void;
// const unless = (paths: string[], middleware: MiddlewareType) => (req: Request, res: Response, next: NextFunction) => {
//     if (paths.find((path) => path === req.path || req.path.includes(path))) {
//         return next();
//     } else {
//         return middleware(req, res, next);
//     }
// };
