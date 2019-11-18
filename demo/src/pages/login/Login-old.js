import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { propTypes, reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import compose from 'recompose/compose';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import {
    MuiThemeProvider,
    createMuiTheme,
    withStyles,
} from '@material-ui/core/styles';
import LockIcon from '@material-ui/icons/Lock';

import { Notification, translate, userLogin } from 'react-admin';

import { lightTheme } from '../../layout/themes';
import logo from "./logo.svg";
import {Fade, Grid, Tab, Tabs, Typography} from "@material-ui/core";
import google from "../../images/google.svg";

const styles = theme =>   ({
    main: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'flex-start',
        background: 'url(https://source.unsplash.com/random/1600x900)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    },
    card: {
        minWidth: 300,
        marginTop: '6em',
    },
    avatar: {
        margin: '1em',
        display: 'flex',
        justifyContent: 'center',
    },
    icon: {
        backgroundColor: theme.palette.secondary.main,
    },
    hint: {
        marginTop: '1em',
        display: 'flex',
        justifyContent: 'center',
        color: theme.palette.grey[500],
    },
    form: {
        width: 320,
        padding: '0 1em 1em 1em',
    },
    input: {
        marginTop: '1em',
    },
    actions: {
        padding: '0 1em 1em 1em',
    },

    container: {
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 0,
        left: 0,
    },
    logotypeContainer: {
        backgroundColor: theme.palette.primary.main,
        width: "60%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        [theme.breakpoints.down("md")]: {
            width: "50%",
        },
        [theme.breakpoints.down("md")]: {
            display: "none",
        },
    },
    logotypeImage: {
        width: 165,
        /*
                marginBottom: theme.spacing(4),
        */
    },
    logotypeText: {
        color: "white",
        fontWeight: 500,
        fontSize: 84,
        /*[theme.breakpoints.down("md")]: {
            fontSize: 48,
        },*/
    },
    formContainer: {
        width: "40%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        /*[theme.breakpoints.down("md")]: {
            width: "50%",
        },*/
    },
    tab: {
        fontWeight: 400,
        fontSize: 18,
    },
    greeting: {
        fontWeight: 500,
        textAlign: "center",
        /*marginTop: theme.spacing(4),*/
    },
    subGreeting: {
        fontWeight: 500,
        textAlign: "center",
        /* marginTop: theme.spacing(2),*/
    },
    googleButton: {
        /*marginTop: theme.spacing(6),*/
        /* boxShadow: theme.customShadows.widget,*/
        backgroundColor: "white",
        width: "100%",
        textTransform: "none",
    },
    googleButtonCreating: {
        marginTop: 0,
    },
    googleIcon: {
        width: 30,
        /*marginRight: theme.spacing(2),*/
    },
    creatingButtonContainer: {
        /* marginTop: theme.spacing(2.5),*/
        height: 46,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    createAccountButton: {
        height: 46,
        textTransform: "none",
    },
    formDividerContainer: {
        /* marginTop: theme.spacing(4),*/
        /* marginBottom: theme.spacing(4),*/
        display: "flex",
        alignItems: "center",
    },
    formDividerWord: {
        /*paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),*/
    },
    formDivider: {
        flexGrow: 1,
        height: 1,
        /* backgroundColor: theme.palette.text.hint + "40",*/
    },
    errorMessage: {
        textAlign: "center",
    },
    textFieldUnderline: {
        "&:before": {
            /*borderBottomColor: theme.palette.primary.light,*/
        },
        "&:after": {
            /*borderBottomColor: theme.palette.primary.main,*/
        },
        "&:hover:before": {
            /*borderBottomColor: `${theme.palette.primary.light} !important`,*/
        },
    },
    textField: {
        /*borderBottomColor: theme.palette.background.light,*/
    },
    formButtons: {
        width: "100%",
        /*marginTop: theme.spacing(4),*/
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    forgetButton: {
        textTransform: "none",
        fontWeight: 400,
    },
    loginLoader: {
        /*marginLeft: theme.spacing(4),*/
    },
    copyright: {
        /*marginTop: theme.spacing(4),*/
        whiteSpace: "nowrap",
        /* [theme.breakpoints.up("md")]: {
             position: "absolute",
             /!*bottom: theme.spacing(2),*!/
         },*/
    },
    /* form: {
         width: 320,
         padding: '0 1em 1em 1em', // TODO: remove line and below
     },*/

});

// see http://redux-form.com/6.4.3/examples/material-ui/
const renderInput = ({
                         meta: { touched, error } = {},
                         input: { ...inputProps },
                         ...props
                     }) => (
    <TextField
        error={!!(touched && error)}
        helperText={touched && error}
        {...inputProps}
        {...props}
        fullWidth
    />
);

let classes = styles;
class Login extends Component {
    login = auth =>
        this.props.userLogin(
            auth,
            this.props.location.state
                ? this.props.location.state.nextPathname
                : '/'
        );

    render() {
        const { classes, handleSubmit, isLoading, translate } = this.props;
        return (
            <Grid container className={classes.container}>
                <div className={classes.logotypeContainer}>
                    <img src={logo} alt="logo" className={classes.logotypeImage} />
                    <Typography className={classes.logotypeText}>Material Admin</Typography>
                </div>
                <div className={classes.formContainer}>
                    <div className={classes.form}>
                            <React.Fragment>
                                <Typography variant="h1" className={classes.greeting}>
                                    Good Morning, User
                                </Typography>
                                <Button size="large" className={classes.googleButton}>
                                    <img src={google} alt="google" className={classes.googleIcon} />
                                    &nbsp;Sign in with Google
                                </Button>
                                <div className={classes.formDividerContainer}>
                                    <div className={classes.formDivider} />
                                    <Typography className={classes.formDividerWord}>or</Typography>
                                    <div className={classes.formDivider} />
                                </div>
                                <Fade >
                                    <Typography color="secondary" className={classes.errorMessage}>
                                        Something is wrong with your login or password :(
                                    </Typography>
                                </Fade>
                                <form onSubmit={handleSubmit(this.login)}>

                                        <TextField
                                            autoFocus
                                            name="username"
                                            component={renderInput}
                                            label={translate('ra.auth.username')}
                                            disabled={isLoading}
                                            InputProps={{
                                                classes: {
                                                    underline: classes.textFieldUnderline,
                                                    input: classes.textField,
                                                },
                                            }}
                                            margin="normal"
                                            placeholder="Email Adress"
                                            fullWidth
                                        />

                                        <TextField
                                            name="password"
                                            component={renderInput}
                                            label={translate('ra.auth.password')}
                                            type="password"
                                            disabled={isLoading}
                                            InputProps={{
                                                classes: {
                                                    underline: classes.textFieldUnderline,
                                                    input: classes.textField,
                                                },
                                            }}
                                            margin="normal"
                                            placeholder="Password"

                                            fullWidth
                                        />
                                    <div className={classes.formButtons}>

                                            <Button
                                                type="submit"
                                                variant="raised"
                                                color="primary"
                                                size="large"
                                                disabled={isLoading}
                                                className={classes.button}
                                            >
                                                Login
                                            </Button>
                                        {isLoading && (
                                            <CircularProgress size={25} thickness={2} />
                                        )}

                                    </div>
                                </form>


                            </React.Fragment>

                    </div>
                    <Typography color="primary" className={classes.copyright}>
                        © 2019-2020 Double Studio, LLC. All rights reserved.
                    </Typography>
                </div>
            </Grid>
        );
    }
}

Login.propTypes = {
    ...propTypes,
    authProvider: PropTypes.func,
    classes: PropTypes.object,
    previousRoute: PropTypes.string,
    translate: PropTypes.func.isRequired,
    userLogin: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ isLoading: state.admin.loading > 0 });

const enhance = compose(
    translate,
    reduxForm({
        form: 'signIn',
        validate: (values, props) => {
            const errors = {};
            const { translate } = props;
            if (!values.username) {
                errors.username = translate('ra.validation.required');
            }
            if (!values.password) {
                errors.password = translate('ra.validation.required');
            }
            return errors;
        },
    }),
    connect(
        mapStateToProps,
        { userLogin }
    ),
    withStyles(styles)
);

const EnhancedLogin = enhance(Login);

// We need to put the MuiThemeProvider decoration in another component
// Because otherwise the withStyles() HOC used in EnhancedLogin won't get
// the right theme
const LoginWithTheme = props => (
    <MuiThemeProvider theme={createMuiTheme(lightTheme)}>
        <EnhancedLogin {...props} />
    </MuiThemeProvider>
);

export default LoginWithTheme;
