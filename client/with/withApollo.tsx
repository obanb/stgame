import React from 'react';
import Head from 'next/head';
import { initApollo } from './initApollo';
import * as cookie from 'cookie';
import { AppContext } from 'next/app';
import { ApolloClient, ApolloProvider } from '@apollo/client';

const parseCookies = (req?: any, options = {}) =>
    cookie.parse(req ? req.headers.cookie || '' : document.cookie, options);

/**
 * Creates and provides the apolloContext
 * to a next.js PageTree. Use it by wrapping
 * your PageComponent via HOC pattern.
 * @param {Function|Class} PageComponent
 * @param {Object} [config]
 * @param {Boolean} [config.ssr=true]
 */
export function withApollo(PageComponent, { ssr = true } = {}) {
    const WithApollo = ({ apolloClient, apolloState, ...pageProps }) => {
        const client =
            apolloClient ||
            initApollo(apolloState, {
                getToken: () => parseCookies().token,
            });
        return (
            <ApolloProvider client={client}>
                <PageComponent {...pageProps} />
            </ApolloProvider>
        );
    };

    // Set the correct displayName in development
    if (process.env.NODE_ENV !== 'production') {
        const displayName = PageComponent.displayName || PageComponent.name || 'Component';

        if (displayName === 'App') {
            console.warn('This withApollo HOC only works with PageComponents.');
        }

        WithApollo.displayName = `withApollo(${displayName})`;
    }

    if (ssr || PageComponent.getInitialProps) {
        WithApollo.getInitialProps = async (ctx: AppContext & { ctx: { apolloClient: ApolloClient<any> } }) => {
            const {
                AppTree,
                router,
                Component,
                ctx: { req, res },
            } = ctx;

            // Initialize ApolloClient, add it to the ctx object so
            // we can use it in `PageComponent.getInitialProp`.
            const apollo = initApollo({}, { getToken: () => parseCookies(req).token }, req);

            // Run wrapped getInitialProps methods
            let pageProps = {};
            if (PageComponent.getInitialProps) {
                pageProps = await PageComponent.getInitialProps(ctx);
            }

            // Only on the server:
            if (typeof window === 'undefined') {
                // When redirecting, the response is finished.
                // No point in continuing to render
                if (res && res.finished) {
                    return pageProps;
                }

                // Only if ssr is enabled
                if (ssr) {
                    try {
                        // Run all GraphQL queries
                        const { getDataFromTree } = await import('@apollo/client/react/ssr');
                        await getDataFromTree(
                            <AppTree
                                pageProps={{ ...pageProps }}
                                Component={Component}
                                router={router}
                                apolloClient={apollo}
                            />,
                        );
                    } catch (error) {
                        // Prevent Apollo Client GraphQL errors from crashing SSR.
                        // Handle them in components via the data.error prop:
                        // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
                        console.error('Error while running `getDataFromTree`', error);
                    }

                    // getDataFromTree does not call componentWillUnmount
                    // head side effect therefore need to be cleared manually
                    Head.rewind();
                }
            }

            // Extract query data from the Apollo store
            const apolloState = apollo.cache.extract();

            return {
                ...pageProps,
                apolloState,
            };
        };
    }

    return WithApollo;
}
