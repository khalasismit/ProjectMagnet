import { useState } from "react";
import {
    Box,
    Button,
    TextField,
    useMediaQuery,
    Typography,
    useTheme,
    Checkbox,
    FormControlLabel,
    Divider,
    // Divider,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { setLogin } from "../../redux/reducers";
import { useDispatch } from "react-redux";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/VisibilityOutlined';
import VisibilityOff from '@mui/icons-material/VisibilityOffOutlined';
import { jwtDecode } from "jwt-decode";
// import LoginButton from "./auth0Login";
// import ForgetPass from "./forgotPass";
// import GoogleSignUpButton from "./googleSignup";

// handling schema and validation 
const loginSchema = yup.object().shape({
    email: yup.string().email("*invalid email").required("*Enter Your Email"),
    password: yup.string().min(8).required("*Password required"),
});

const initialValuesLogin = {
    email: "",
    password: "",
};

const registerSchema = yup.object().shape({
    firstName: yup.string().required("*Your First Name"),
    lastName: yup.string().required("*Your Last Name"),
    userName: yup.string().required("*UserName has to be unique.").matches(/^[a-zA-Z0-9]*$/, 'Only alphanumeric characters are allowed'),
    bio: yup.string().max(120),
    email: yup.string().email("*invalid email").required("*Enter Your Email"),
    password: yup.string().min(8).required("*Password required."),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], "*Confirm Password is Incorrect").required("*Confirm Password is Required")
});

const initialValuesRegister = {
    firstName: "",
    lastName: "",
    userName: "",
    bio: "",
    email: "",
    password: "",
    confirmPassword: ""
};

const Form = () => {

    const [pageType, setPageType] = useState("login");
    const { palette } = useTheme();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";
    const isForgotPass = pageType === "forgot";
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const [snackbar, setSnackbar] = useState(false);
    const [tnc, setTnc] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const TogglePwdVisibility = () => {
        setShowPassword(!showPassword);
    };

    const [showConfirm, setshowConfirm] = useState(false);
    const toggleCPwdVisibility = () => {
        setshowConfirm(!showConfirm);
    };
    const handleContinueWithGoogle = async (values) => {
        try {
            const response = await fetch('http://localhost:3001/auth/admin/google/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });
            const Data = await response.json()
            if (response.ok) {
                setSnackbar(true);
                dispatch(
                    setLogin({
                        user: Data.user,
                        token: Data.token
                    }),
                );
                setTimeout(() => {
                    setSnackbar(false)
                    navigate("/home");
                }, 1500);
            } else {
                console.error('Error continue with Google');
            }
        } catch (error) {
            console.error('Error continue with Google:', error);
            // Handle error
        }
    };

    const register = async (values) => {
        console.log("Register", JSON.stringify(values))
        let savedUserRes = await fetch("http://localhost:3001/auth/admin/signup",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values)    
            }
        );
        let savedUser = await savedUserRes.json();
        // onSubmitProps.resetForm();
        if (savedUser !== "Error") {
            setSnackbar(true)
            setTimeout(() => {
                setSnackbar(false)
                setPageType("login");
            }, 1500);
        }
        else {
            setError("User already exist with this email.");
            // Clear the error after 3 sec
            setTimeout(() => {
                setError("");
            }, 3000);
        }
    }

    const login = async (values) => {
        const loggedInRes = await fetch("http://localhost:3001/auth/admin/login",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            }
        )
        var loggedIn = "";
        loggedIn = await loggedInRes.json();
        if (loggedIn !== "Error") {
            setSnackbar(true);
            console.log("login success")
            dispatch(
                setLogin({
                    user: loggedIn.admin,
                    token: loggedIn.token
                }),
            );
            setTimeout(() => {
                setSnackbar(false)
                navigate("/home");
            }, 1500);
        }
        else {
            setError("Invalid credentials.");
            // Clear the error after 3 sec
            setTimeout(() => {
                setError("");
            }, 3000);
        }
    }
    const handleFormSubmit = async (values, onSubmitProps) => {
        if (isLogin) { await login(values, onSubmitProps); }
        if (isRegister) { await register(values, onSubmitProps) };
    };

    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
            validationSchema={isLogin ? loginSchema : registerSchema}
        >
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm,
            }) => (
                <form autoComplete="on" onSubmit={handleSubmit}>
                    <Snackbar
                        open={snackbar}
                        varient="filled"
                        autoHideDuration={3000}
                        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                    ><Alert variant="filled" severity="success">{isRegister ? "SIGN-UP COMPLETE." : "LOGIN DONE."}</Alert></Snackbar>
                    <Box
                        display="grid"
                        gap="1rem"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        sx={{
                            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                        }}
                    >

                        {isRegister && (
                            <>
                                <TextField
                                    size="small"
                                    label="First Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.firstName}
                                    name="firstName"
                                    error={
                                        Boolean(touched.firstName) && Boolean(errors.firstName)
                                    }
                                    helperText={touched.firstName && errors.firstName}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    size="small"
                                    label="Last Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.lastName}
                                    name="lastName"
                                    error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                                    helperText={touched.lastName && errors.lastName}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    size="small"
                                    fullWidth
                                    label="User Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.userName}
                                    name="userName"
                                    error={Boolean(touched.userName) && Boolean(errors.userName)}
                                    helperText={touched.userName && errors.userName}
                                    sx={{ gridColumn: "span 4" }}
                                />
                                <TextField
                                    size="small"
                                    label="Bio"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.bio}
                                    name="bio"
                                    multiline
                                    error={
                                        Boolean(touched.bio) && Boolean(errors.bio)
                                    }
                                    helperText={touched.bio && errors.bio}
                                    sx={{ gridColumn: "span 4" }}
                                />
                            </>
                        )}
                        {!isForgotPass && (
                            <>
                                <TextField
                                    size="small"
                                    label="Email"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.email}
                                    name="email"
                                    error={Boolean(touched.email) && Boolean(errors.email)}
                                    helperText={touched.email && errors.email}
                                    sx={{ gridColumn: "span 4" }}
                                />  
                                <TextField
                                    size="small"
                                    label="Password"
                                    type={showPassword ? 'text' : 'password'}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.password}
                                    name="password"
                                    error={Boolean(touched.password) && Boolean(errors.password)}
                                    helperText={touched.password && errors.password}
                                    sx={{ gridColumn: "span 4" }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={TogglePwdVisibility}
                                                    edge="end"
                                                >
                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </>
                        )
                        }
                        {isRegister && (
                            <TextField
                                size="small"
                                fullWidth
                                label="Confirm Password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.confirmPassword}
                                name="confirmPassword"
                                type={showConfirm ? 'text' : 'password'}
                                error={
                                    Boolean(touched.confirmPassword) && Boolean(errors.confirmPassword)
                                }
                                helperText={touched.confirmPassword && errors.confirmPassword}
                                sx={{ gridColumn: "span 4" }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={toggleCPwdVisibility}
                                                edge="end"
                                            >
                                                {showConfirm ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        )}
                    </Box>
                    {!isLogin && !isForgotPass && (
                        <Box sx={{ display: "flex", alignItems: "center", gap: "2px" }}>
                            <Checkbox
                                checked={tnc}
                                onClick={() => setTnc(!tnc)}
                                name="termsAndConditions"
                                color="primary"
                            />I accept the
                            <Link to={"/tnc/terms-and-conditions"} target="_blank" style={{ color: palette.primary.dark }}>
                                <span>
                                    terms and conditions
                                </span>
                            </Link>
                        </Box>
                    )}
                    {isLogin && (
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "end", pt: 1, cursor: "pointer" }} onClick={() => { setPageType("forgot") }}>
                            <Typography sx={{ textDecoration: "underline", color: palette.primary.main }}>
                                forgot password?
                            </Typography>
                        </Box>
                    )}
                    {
                        isForgotPass &&
                        (<>
                            Work in progress
                            {/* <ForgetPass /> */}
                        </>
                        )
                    }
                    {/* Error */}
                    <Typography color="red" p="1rem 0 0 0">{error}</Typography>
                    {/* BUTTONS */}
                    <Box>
                        {!isForgotPass && <Button
                            fullWidth
                            type="submit"
                            sx={{
                                m: "0 0 1rem 0",
                                p: "0.5rem",
                                backgroundColor: palette.primary.dark,
                                color: palette.background.alt,
                                "&:hover": { color: palette.primary.dark, background: palette.primary.main },
                            }}
                            disabled={isRegister && !tnc}
                        > {
                                isLogin ? "LOGIN" : "REGISTER"
                            }</Button>}
                        <Divider flexItem sx={{ m: 1 }} textAlign="center">Or</Divider>
                        <Box sx={{ display: "flex", justifyContent: "center", m: 2 }}>
                            {/* <GoogleButton label="Continue with google" onClick={handleGoogleLogin} ></GoogleButton> */}
                            <GoogleOAuthProvider
                                clientId="39621683080-hq2nsug77bkpvrllrsavutbpeahegqbc.apps.googleusercontent.com">
                                <GoogleLogin
                                    size="large"
                                    text="continue_with"
                                    onSuccess={CredentialResponse => {
                                        // console.log(CredentialResponse)
                                        const details = jwtDecode(CredentialResponse.credential);
                                        const values = ({
                                            email: details.email,
                                            firstName: details.given_name,
                                            lastName: details.family_name,
                                            userName: details.name,
                                            picturePath: details.picture
                                        })
                                        handleContinueWithGoogle(values)
                                    }}
                                    onError={() => {
                                        console.log("err")
                                    }}
                                ></GoogleLogin>
                            </GoogleOAuthProvider>
                        </Box>
                        <Typography
                            onClick={() => {
                                setPageType(isLogin ? "register" : "login");
                                resetForm();
                            }}
                            sx={{
                                textAlign: 'center',
                                textDecoration: "underline",
                                color: palette.primary.dark,
                                "&:hover": {
                                    cursor: "pointer",
                                    color: palette.primary.main,
                                },
                            }}
                        >
                            {isLogin
                                ? "Don't have an account? Sign up "
                                : "Already have an account? Login "}
                        </Typography>
                    </Box>
                </form>
            )}
        </Formik>
    );
};

export default Form;