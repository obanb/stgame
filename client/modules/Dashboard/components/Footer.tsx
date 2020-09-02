import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Link, Theme, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(4),
    },
}));

export const Footer = () => {
    const classes = useStyles({});

    return (
        <div className={classes.root}>
            <Typography variant="body1">
                &copy;{' '}
                <Link component="a" href="https://devias.io/" target="_blank">
                    Devias IO
                </Link>
                . 2019
            </Typography>
            <Typography variant="caption">
                Created with love for the environment. By designers and developers who love to work together in offices!
            </Typography>
        </div>
    );
};
