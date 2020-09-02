import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Badge, Hidden, IconButton, Theme, Toolbar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import Link from 'next/link';
import Switch from '@material-ui/core/Switch';
import { Context } from '../../../with';
import { AppTheme } from '../../../with/theme';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        boxShadow: 'none',
    },
    flexGrow: {
        flexGrow: 1,
    },
    signOutButton: {
        marginLeft: theme.spacing(1),
    },
}));

export const Topbar = ({ onSidebarOpen }) => {
    const classes = useStyles({});
    const [notifications] = useState([]);
    const { changeTheme, theme } = useContext(Context);

    const handleChangeTheme = () => changeTheme(theme === AppTheme.DARK ? AppTheme.LIGHT : AppTheme.DARK);

    return (
        <AppBar className={classes.root}>
            <Toolbar>
                <Link href="/">
                    <img alt="Logo" src="/images/logos/logo--white.svg" />
                </Link>
                <div className={classes.flexGrow} />
                <Hidden mdDown>
                    <Switch onChange={handleChangeTheme} />
                    <IconButton color="inherit">
                        <Badge badgeContent={notifications.length} color="primary" variant="dot">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <IconButton className={classes.signOutButton} color="inherit">
                        <InputIcon />
                    </IconButton>
                </Hidden>
                <Hidden lgUp>
                    <IconButton color="inherit" onClick={onSidebarOpen}>
                        <MenuIcon />
                    </IconButton>
                </Hidden>
            </Toolbar>
        </AppBar>
    );
};
