import {
    Box,
    Button,
    TextField,
    useMediaQuery,
    Typography,
    useTheme,
    // Checkbox,
    // FormControlLabel,
    // Divider,
    // Divider,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/VisibilityOutlined';
import VisibilityOff from '@mui/icons-material/VisibilityOffOutlined';
import { useEffect, useState } from "react";
import Mode from "../../../components/mode";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
const ResetPass = () => {
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width: 1000px)");
    const theme = useTheme();
    const [user,setUser] = useState([]);

    // const { palette } = useTheme();
    // const [msg, setMsg] = useState("")
    // const handleFormSubmit = () => {

    // }
    const handleFormSubmit = async (values, onSubmitProps) => {
        // console.log(values);
        const res = await fetch(`http://localhost:3001/auth/reset-password/${user.id}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password: values.password
            })
        })
        const data = await res.json()
        if (data.error) {
            console.log(data.error)
        } else {
            setSnackbar(true)
            onSubmitProps.resetForm()
            setTimeout(() => {
                setSnackbar(false)
                navigate("/")
            }, 3000)
        }
    };
    const {token} = useParams()
    const [snackbar, setSnackbar] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const TogglePwdVisibility = () => {
        setShowPassword(!showPassword);
    };

    const [showConfirm, setshowConfirm] = useState(false);
    const toggleCPwdVisibility = () => {
        setshowConfirm(!showConfirm);
    };
    const passSchema = yup.object().shape({
        password: yup.string().min(8).required("*password required."),
        confirmPassword: yup.string().oneOf([yup.ref('password'), null], "*Confirm password is Incorrect").required("*Confirm password is Required")
    });

    const initValues = {
        password: "",
        confirmPassword: ""
    }

    useEffect(()=>{
        // console.log(token)
        setUser(jwtDecode(token));
        // console.log(jwtDecode(token))
    },[])

    return (
        <Box>
            <Box
                width="100%"
                // backgroundColor={theme.palette.background.alt}
                p="1rem 6%"
                textAlign="center"
            >
                <img src={"https://firebasestorage.googleapis.com/v0/b/magnet784492.appspot.com/o/logo%2Fmagnet3.png?alt=media&token=750dc1ef-316a-4bf3-8a83-8024f0a90dea"} style={{ width: "5rem", height: "4rem", objectFit: "cover" }} alt="" />
                <Typography fontWeight="bold" fontSize="30px" color={theme.palette.neutral.dark} sx={{ lineHeight: "0px" }}>
                    Magnet
                </Typography>
            </Box>

            <Box
                width={isNonMobile ? "50%" : "93%"}
                p="1.5rem"
                m="2rem auto"
                borderRadius="1.5rem"
                backgroundColor={theme.palette.background.alt}
            >
                <Typography sx={{ mb: "1.5rem", textAlign: "center", fontSize: "1rem" }}>
                    Bringing People Closer : Magnet - Your Social Attraction!
                </Typography>
                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={initValues}
                    validationSchema={passSchema}
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
                            ><Alert variant="filled" severity="success">Password Changed</Alert></Snackbar>
                            <Box
                                display="grid"
                                gap="1rem"
                                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                sx={{
                                    "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                                }}
                            >
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
                                                    aria-label="toggle pass visibility"
                                                    onClick={toggleCPwdVisibility}
                                                    edge="end"
                                                >
                                                    {showConfirm ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Box>
                            <Button fullWidth
                                sx={{
                                    m: "1rem 0",
                                    p: "0.5rem",
                                    backgroundColor: theme.palette.primary.dark,
                                    color: theme.palette.background.alt,
                                    "&:hover": { color: theme.palette.primary.dark, background: theme.palette.primary.main },
                                }} onClick={handleSubmit} >Reset password</Button>
                            {/* Error */}
                            {/* <Typography color="red" p="1rem 0 0 0">{error}</Typography> */}
                            {/* BUTTONS */}
                        </form>
                    )}
                </Formik>
                {/* <Form /> */}
                {/* <div>
                    <form>
                        <Box sx={{display:"flex",flexDirection:"column",gap:2}}>
                        <TextField fullWidth size="small" type="email" label="" placeholder="Enter New pass" value={pass} onChange={(e) => setPass(e.target.value)}></TextField>
                        <TextField fullWidth size="small" type="email" label="" placeholder="Enter Confirm pass" value={cpass} onChange={(e) => setCpass(e.target.value)}></TextField>
                        </Box>
                        {
                            msg != "" &&
                            <Typography sx={{ textAlign: "center", color: palette.primary.main, p: "1rem 0 0 0" }}>{msg}</Typography>
                        }
                        <Button fullWidth
                            sx={{
                                m: "1rem 0",
                                p: "0.5rem",
                                backgroundColor: palette.primary.dark,
                                color: palette.background.alt,
                                "&:hover": { color: palette.primary.dark, background: palette.primary.main },
                            }} onClick={handleSendEmail} >Reset pass</Button>
                    </form>
                </div> */}
            </Box>
            <Box sx={{ position: "absolute", top: 0, right: 0 }}>
                <Mode></Mode>
            </Box>
        </Box>
    );
};

export default ResetPass;