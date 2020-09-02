import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Theme, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: 'fit-content',
    },
    avatar: {
        width: 60,
        height: 60,
    },
    name: {
        marginTop: theme.spacing(1),
    },
}));

export const Profile = () => {
    const classes = useStyles({});

    const user = {
        name: 'Shen Zhi',
        avatar: '/images/avatars/avatar_11.png',
        bio: 'Brain Director',
    };
    return (
        <div className={classes.root}>
            <Avatar className={classes.avatar}>{user.avatar}</Avatar>
            <Typography className={classes.name} variant="h4">
                {user.name}
            </Typography>
            <Typography variant="body2">{user.bio}</Typography>
        </div>
    );
};
