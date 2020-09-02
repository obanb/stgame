import React from 'react';
import Head from 'next/head';
import App from 'next/app';
import { Compose, ContextConsumer, store, withApollo } from '../client/with';
import { CssBaseline } from '@material-ui/core';
import { appThemeOptions } from '../client/with/theme';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { ThemeProvider } from '@material-ui/styles';
import { appWithTranslation } from '../i18n';

export const compose = (...fns) =>
    fns.reduceRight(
        (prevFn, nextFn) => (...args) => nextFn(prevFn(...args)),
        (value) => value,
    );

class NextApp extends App {
    componentDidMount() {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentNode.removeChild(jssStyles);
        }
    }

    render() {
        const { Component, pageProps } = this.props;
        const initialState = {
            admin: {
                activ: true,
            },
        };
        return (
            <>
                <Head>
                    <title>My page</title>
                </Head>
                <Compose providers={store} props={initialState}>
                    <ContextConsumer>
                        {({ theme }) => {
                            const muiTheme = createMuiTheme(appThemeOptions[theme] as any);
                            return (
                                <ThemeProvider theme={muiTheme}>
                                    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                                    <CssBaseline />
                                    <Component {...pageProps} {...initialState} />
                                </ThemeProvider>
                            );
                        }}
                    </ContextConsumer>
                </Compose>
            </>
        );
    }
}

export default compose(withApollo, appWithTranslation)(NextApp);
