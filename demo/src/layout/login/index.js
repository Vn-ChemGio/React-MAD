import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Field, Form} from 'react-final-form';

import {Button, CircularProgress, TextField} from "@material-ui/core";
import {createMuiTheme} from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/styles';

import {Notification, useTranslate, useLogin, useNotify} from 'react-admin';

import {lightTheme} from '../themes';
import useStyles from './styles';

import logo from "./logo.svg";
import google from "../../images/google.svg";
import {Grid, Tab, Tabs, Typography} from "@material-ui/core";

const renderInput = ({
                         meta: {touched, error} = {},
                         input: {...inputProps},
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

const Login = ({location}) => {
    const [isLoading, setLoading] = useState(false);
    const translate = useTranslate();
    const classes = useStyles();
    const notify = useNotify();
    const login = useLogin();
    var [activeTabId, setActiveTabId] = useState(0);



    const handleSubmit = auth => {
        setLoading(true);
        login(auth, location.state ? location.state.nextPathname : '/')
            .then(() => setLoading(false))
            .catch(error => {
                setLoading(false);
                notify(
                    typeof error === 'string'
                        ? error
                        : typeof error === 'undefined' || !error.message
                        ? 'ra.auth.sign_in_error'
                        : error.message,
                    'warning'
                );
            });
    };

    const validate = values => {
        const errors = {};
        if (!values.username) {
            errors.username = translate('ra.validation.required');
        }
        if (!values.password) {
            errors.password = translate('ra.validation.required');
        }
        return errors;
    };



    return (
        <Grid container className={classes.container}>
            <div className={classes.logotypeContainer}>
                <img src={logo} alt="logo" className={classes.logotypeImage}/>
                <Typography className={classes.logotypeText}>Material Admin</Typography>
            </div>
            <div className={classes.formContainer}>
                <div className={classes.form}>
                    <Tabs
                        value={activeTabId}
                        onChange={(e, id) => setActiveTabId(id)}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab label="Login" classes={{root: classes.tab}}/>
                        {/*<Tab label="New User" classes={{root: classes.tab}}/>*/}
                    </Tabs>
                    {activeTabId === 0 && (
                        <React.Fragment>
                            <Typography variant="h1" className={classes.greeting}>
                                Good Morning, User
                            </Typography>
                            <Button size="large" className={classes.googleButton}>
                                <img src={google} alt="google" className={classes.googleIcon}/>
                                &nbsp;Sign in with Google
                            </Button>
                            <div className={classes.formDividerContainer}>
                                <div className={classes.formDivider}/>
                                <Typography className={classes.formDividerWord}>or</Typography>
                                <div className={classes.formDivider}/>
                            </div>

                            <Form
                                onSubmit={handleSubmit}
                                validate={validate}
                                render={({handleSubmit}) => (
                                    <form onSubmit={handleSubmit} noValidate>
                                        <Field InputProps={{
                                            classes: {
                                                underline: classes.textFieldUnderline,
                                                input: classes.textField,
                                            },
                                        }}
                                               autoFocus
                                               name="username"
                                               component={renderInput}
                                               label={translate('ra.auth.username')}
                                               disabled={isLoading}
                                               margin="normal" placeholder="Username" type="text" fullWidth
                                        />
                                        <Field InputProps={{
                                            classes: {
                                                underline: classes.textFieldUnderline,
                                                input: classes.textField,
                                            },
                                        }}
                                               autoFocus
                                               name="password"
                                               component={renderInput}
                                               label={translate('ra.auth.password')}
                                               disabled={isLoading}
                                               margin="normal" placeholder="Password" type="password" fullWidth
                                        />


                                        <div className={classes.formButtons}>
                                            {isLoading ? (
                                                <CircularProgress size={26} className={classes.loginLoader}/>) : (
                                                <Button
                                                    disabled={isLoading}
                                                    variant="contained" type="submit" color="primary" size="large">
                                                    {translate('ra.auth.sign_in')}
                                                </Button>
                                            )}
                                            <Button color="primary" size="large" className={classes.forgetButton}>
                                                Forget Password
                                            </Button>
                                            <Notification />
                                        </div>
                                    </form>
                                )}
                            />


                        </React.Fragment>
                    )}
                    {/*{activeTabId === 1 && (
                <React.Fragment>
                  <Typography variant="h1" className={classes.greeting}>
                    Welcome!
                  </Typography>
                  <Typography variant="h2" className={classes.subGreeting}>
                    Create your account
                  </Typography>
                  <Fade in={error}>
                    <Typography color="secondary" className={classes.errorMessage}>
                      Something is wrong with your login or password :(
                    </Typography>
                  </Fade>
                  <TextField id="name" InputProps={{
                    classes: {
                      underline: classes.textFieldUnderline,
                      input: classes.textField,
                    },
                  }} value={nameValue} onChange={e => setNameValue(e.target.value)} margin="normal" placeholder="Full Name" type="email" fullWidth/>
                  <TextField id="email" InputProps={{
                    classes: {
                      underline: classes.textFieldUnderline,
                      input: classes.textField,
                    },
                  }} value={loginValue} onChange={e => setLoginValue(e.target.value)} margin="normal" placeholder="Email Adress" type="email" fullWidth/>
                  <TextField id="password" InputProps={{
                    classes: {
                      underline: classes.textFieldUnderline,
                      input: classes.textField,
                    },
                  }} value={passwordValue} onChange={e => setPasswordValue(e.target.value)} margin="normal" placeholder="Password" type="password" fullWidth/>
                  <div className={classes.creatingButtonContainer}>{isLoading ? (<CircularProgress size={26} />) : (
                      <Button onClick={() => loginUser(userDispatch, loginValue, passwordValue, props.history, setIsLoading, setError,)} disabled={
                        loginValue.length === 0 ||
                        passwordValue.length === 0 ||
                        nameValue.length === 0
                      } size="large" variant="contained" color="primary" fullWidth className={classes.createAccountButton}
                      >
                        Create your account
                      </Button>
                  )}
                  </div>
                  <div className={classes.formDividerContainer}>
                    <div className={classes.formDivider} />
                    <Typography className={classes.formDividerWord}>or</Typography>
                    <div className={classes.formDivider} />
                  </div>
                  <Button size="large" className={classnames(classes.googleButton, classes.googleButtonCreating,)}>
                    <img src={google} alt="google" className={classes.googleIcon} />
                    &nbsp;Sign in with Google
                  </Button>
                </React.Fragment>
            )}*/}
                </div>
                <Typography color="primary" className={classes.copyright}>
                    © 2014-2019 Flatlogic, LLC. All rights reserved.
                </Typography>
            </div>
        </Grid>
    )
};

Login.propTypes = {
    authProvider: PropTypes.func,
    previousRoute: PropTypes.string,
};

// We need to put the ThemeProvider decoration in another component
// Because otherwise the useStyles() hook used in Login won't get
// the right theme
const LoginWithTheme = props => (
    <ThemeProvider theme={createMuiTheme(lightTheme)}>
        <Login {...props} />
    </ThemeProvider>
);

export default LoginWithTheme;
