import React from 'react';
import { Container } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Cookie from 'js-cookie';
import Router from 'next/router';
import { ContextConsumer } from '../client/with';
import Link from 'next/link';
import Switch from '@material-ui/core/Switch';
import { AppTheme } from '../client/with/theme';
import { Dashboard } from '../client/modules/Dashboard/components/Dashboard';
import { MadeWithLove } from './login';

// const name = 'x-access-token';

declare const process: any;

export default class Index extends React.Component {
    static displayName = 'Page()';

    // static async getInitialProps({ req, pathname }: any) {
    // }

    render() {
        return (
            <ContextConsumer>
                {({ changeTheme, theme }) => {
                    const handleChangeTheme = () =>
                        changeTheme(theme === AppTheme.DARK ? AppTheme.LIGHT : AppTheme.DARK);

                    return (
                        <Dashboard>
                            <Container maxWidth="sm">
                                <Box my={4}>
                                    <Typography color="primary" variant="h4" component="h1" gutterBottom>
                                        Next.js v4-alpha with TypeScript example
                                    </Typography>
                                    <Link href="/login">
                                        <a>Go to the login page</a>
                                    </Link>
                                    <br />
                                    <Switch onChange={handleChangeTheme} />
                                    <MadeWithLove />
                                </Box>
                            </Container>
                        </Dashboard>
                    );
                }}
            </ContextConsumer>
        );
    }
}
