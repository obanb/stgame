import React, { useContext } from 'react';
import { useTranslation } from '../i18n';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Context, Context2 } from '../client/with';
import Switch from '@material-ui/core/Switch';
import { AppTheme } from '../client/with/theme';
import { Avatar, Box, Button, Checkbox, FormControlLabel, Grid, Link, TextField } from '@material-ui/core';

// const GET_COURSE = gql`
//     query GetCourse {
//         course {
//             list {
//                 id
//                 title
//                 category
//             }
//         }
//     }
// `;

const Love = () => {
    // const {data, loading} = useQuery(GET_COURSE, {fetchPolicy: 'network-only'});
    const { theme } = useContext(Context);
    const { count } = useContext(Context2);

    //const {count} = useContext(Context)
    // useEffect(() => {
    //     if (theme === Context.Consumer['_currentValue'].theme) {
    //         return undefined;
    //     }
    // });
    // if (loading) {
    //     return <LinearProgress />;
    // }

    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Built with love by the '}
            <Link color="inherit" href="https://material-ui.com/">
                Material-UI and theme {theme} and count {count}
            </Link>
            {/*{data.course.list.map((dat) => (*/}
            {/*    <li key={dat.id}>{dat.title}</li>*/}
            {/*))}*/}
        </Typography>
    );
};
export const MadeWithLove = React.memo(Love);

const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Index = (props) => {
    const classes = useStyles({});
    const { t } = useTranslation();
    const { changeTheme, theme } = useContext(Context);
    const { count, increase } = useContext(Context2);
    const handleChangeTheme = () => changeTheme(theme === AppTheme.DARK ? AppTheme.LIGHT : AppTheme.DARK);
    console.log('render login: ');
    console.log('admin', props);
    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    {t('portal-admin-name')}
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        Sign Up and count {count}
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                                {' Sign Up.Its free.Version 2'}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <MadeWithLove />
                <Switch onChange={handleChangeTheme} />
                <Button onClick={increase}>Přidat</Button>
            </Box>
        </Container>
    );
};

export default Index;
