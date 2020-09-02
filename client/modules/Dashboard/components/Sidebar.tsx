import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer, Theme } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import ImageIcon from '@material-ui/icons/Image';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SettingsIcon from '@material-ui/icons/Settings';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { Profile } from './Profile';
import { SidebarNav } from './SidebarNav';

const useStyles = makeStyles((theme: Theme) => ({
    drawer: {
        width: 240,
        [theme.breakpoints.up('lg')]: {
            marginTop: 64,
            height: 'calc(100% - 64px)',
        },
    },
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: theme.spacing(2),
    },
    divider: {
        margin: theme.spacing(2, 0),
    },
}));

export const Sidebar = ({ open, variant, onClose }) => {
    const classes = useStyles({});

    const pages = [
        {
            title: 'Dashboard',
            href: '/dashboard',
            icon: <DashboardIcon />,
        },
        {
            title: 'Users',
            href: '/users',
            icon: <PeopleIcon />,
        },
        {
            title: 'Products',
            href: '/products',
            icon: <ShoppingBasketIcon />,
        },
        {
            title: 'Authentication',
            href: '/sign-in',
            icon: <LockOpenIcon />,
        },
        {
            title: 'Typography',
            href: '/typography',
            icon: <TextFieldsIcon />,
        },
        {
            title: 'Icons',
            href: '/icons',
            icon: <ImageIcon />,
        },
        {
            title: 'Account',
            href: '/account',
            icon: <AccountBoxIcon />,
        },
        {
            title: 'Settings',
            href: '/settings',
            icon: <SettingsIcon />,
        },
    ];

    return (
        <Drawer anchor="left" classes={{ paper: classes.drawer }} onClose={onClose} open={open} variant={variant}>
            <div className={classes.root}>
                <Profile />
                <Divider className={classes.divider} />
                <SidebarNav pages={pages} />
            </div>
        </Drawer>
    );
};
