import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Button, List, ListItem, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
    nav: {
        marginBottom: theme.spacing(2),
    },
    item: {
        display: 'flex',
        paddingTop: 0,
        paddingBottom: 0,
    },
    button: {
        padding: '10px 8px',
        justifyContent: 'flex-start',
        textTransform: 'none',
        letterSpacing: 0,
        width: '100%',
        fontWeight: theme.typography.fontWeightMedium,
    },
    icon: {
        color: theme.palette.grey[600],
        width: 24,
        height: 24,
        display: 'flex',
        alignItems: 'center',
        marginRight: theme.spacing(1),
    },
    /*active: {
        color: theme.palette.primary.main,
        fontWeight: theme.typography.fontWeightMedium,
        '& $icon': {
            color: theme.palette.primary.main,
        },
    },*/
}));

export const SidebarNav = ({ pages }) => {
    const classes = useStyles({});

    return (
        <List className={classes.nav}>
            {pages.map((page) => (
                <ListItem className={classes.item} disableGutters key={page.title}>
                    <Button className={classes.button} href={page.href}>
                        <div className={classes.icon}>{page.icon}</div>
                        {page.title}
                    </Button>
                </ListItem>
            ))}
        </List>
    );
};
