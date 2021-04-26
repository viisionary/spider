import React from "react";
import {Interpreter} from "xstate";
import {useService} from "@xstate/react";
import {Link, useLocation} from "react-router-dom";
import {
    Button,
    CssBaseline,
    TextField,
    Typography,
    makeStyles,
    Container,
} from "@material-ui/core";
import {Formik, Form, Field, FieldProps} from "formik";
import {string, object} from "yup";

// import RWALogo from "./SvgRwaLogo";
// import Footer from "./Footer";
import {SignInPayload} from "../models";
import {AuthMachineContext, AuthMachineEvents} from "../machines/authMachine";
import {Alert} from "@material-ui/lab";

import logo from '../svg/logo.svg'

const validationSchema = object({
    username: string().required("Username is required"),
    password: string()
        .min(4, "Password must contain at least 4 characters")
        .required("Enter your password"),
});

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // backgroundImage:bg
    },
    logo: {
        color: theme.palette.primary.main,
        width: '60px',
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    alertMessage: {
        marginBottom: theme.spacing(2),
    },
}));

export interface Props {
    authService: Interpreter<AuthMachineContext, any, AuthMachineEvents, any>;
}

const SignInForm: React.FC<Props> = ({authService}) => {
    const classes = useStyles();
    const [authState, sendAuth] = useService(authService);
    const initialValues: SignInPayload = {
        username: "",
        password: "",
        remember: undefined,
    };
    let location = useLocation();
    console.log(location)
    console.log('UnLoggedInRoutes')
    const signInPending = (payload: SignInPayload) => sendAuth({type: "LOGIN", ...payload});

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                {authState.context?.message && (
                    <Alert data-test="signin-error" severity="error" className={classes.alertMessage}>
                        {authState.context.message}
                    </Alert>
                )}
                <img className={classes.logo} src={logo} alt="" />
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={async (values, {setSubmitting}) => {
                        setSubmitting(true);
                        signInPending(values);
                    }}
                >
                    {({isValid, isSubmitting}) => (
                        <Form className={classes.form}>
                            <Field name="username">
                                {({field, meta: {error, value, initialValue, touched}}: FieldProps) => (
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        id="username"
                                        label="用户名"
                                        type="text"
                                        autoFocus
                                        data-test="signin-username"
                                        error={(touched || value !== initialValue) && Boolean(error)}
                                        helperText={touched || value !== initialValue ? error : ""}
                                        {...field}
                                    />
                                )}
                            </Field>
                            <Field name="password">
                                {({field, meta: {error, value, initialValue, touched}}: FieldProps) => (
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        label="密码"
                                        type="password"
                                        id="password"
                                        data-test="signin-password"
                                        error={touched && value !== initialValue && Boolean(error)}
                                        helperText={touched && value !== initialValue && touched ? error : ""}
                                        {...field}
                                    />
                                )}
                            </Field>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                data-test="signin-submit"
                                disabled={!isValid || isSubmitting}
                            >
                                Sign In
                            </Button>
                        </Form>
                    )}
                </Formik>
            </div>

        </Container>
    );
};

export default SignInForm;
