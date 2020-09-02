import React, { useState } from 'react';
import cx from 'classnames';
import { makeStyles, useTheme } from '@material-ui/styles';
import { Theme, useMediaQuery } from '@material-ui/core';
import { Topbar } from './TopBar';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        paddingTop: 56,
        height: '100%',
        [theme.breakpoints.up('sm')]: {
            paddingTop: 64,
        },
    },
    shiftContent: {
        paddingLeft: 240,
    },
    content: {
        height: '100%',
    },
}));

export const Dashboard = ({ children }) => {
    const theme = useTheme<Theme>();
    const classes = useStyles({});
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
        defaultMatches: true,
    });

    const [openSidebar, setOpenSidebar] = useState(false);

    const handleSidebarOpen = () => {
        setOpenSidebar(true);
    };

    const handleSidebarClose = () => {
        setOpenSidebar(false);
    };

    const shouldOpenSidebar = isDesktop ? true : openSidebar;

    return (
        <div
            className={cx({
                [classes.root]: true,
                [classes.shiftContent]: isDesktop,
            })}
        >
            <Topbar onSidebarOpen={handleSidebarOpen} />
            <Sidebar
                onClose={handleSidebarClose}
                open={shouldOpenSidebar}
                variant={isDesktop ? 'persistent' : 'temporary'}
            />
            <main className={classes.content}>
                {children}
                <Footer />
            </main>
        </div>
    );
};
