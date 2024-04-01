import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Alert, Box, Divider, Snackbar, Typography, useMediaQuery } from "@mui/material"
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../redux/reducers";
import { useState } from "react";
const EditPost = ({ params }) => {
    const [snackbar, setSnackbar] = useState(false)
    const token = useSelector(state=>state.token)
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const initialValues = {
        firstName: params.row.firstName, lastName: params.row.lastName, post: params.row.post
    }
    const handleFormSubmit = async (values, onSubmitProps) => {
        let savedPostRes = await fetch(`http://localhost:3001/posts/editpost/${params.row._id}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json",Authorization: `Bearer ${token}`},
                body: JSON.stringify(values)
            }
        )
        let savedPost = await savedPostRes.json();
        if (savedPost) {
            setSnackbar(true)
            dispatch(
                setPosts({
                    posts: savedPost.posts
                })
            );
            setTimeout(() => {
                setSnackbar(false)
                handleClose();
                onSubmitProps.resetForm();
            }, 1500);
        }
    }
    return <>
        <Box p={"1rem"} sx={{ ":hover": { background: "lightgray", borderRadius: "1rem" } }}>
            <Snackbar
                open={snackbar}
                varient="filled"
                autoHideDuration={1500}
                anchorOrigin={{ vertical: 'bottom', horizontal: "left" }}
            ><Alert variant="filled" severity="success">Post Updated Successfully.</Alert></Snackbar>
            <EditOutlinedIcon onClick={handleClickOpen} />
            <Dialog open={open} onClose={handleClose} sx={{ borderRadius: "1rem" }}>
                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={initialValues}
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
                            <Typography textAlign="center" m="1rem" fontFamily="monospace" fontSize="1.7rem" fontWeight="bold">
                                Edit Profile
                            </Typography>
                            <Divider sx={{ margin: "0rem 0rem 0.5rem 0rem" }} />
                            <Box
                                p={"1rem"}
                                display="grid"
                                gap="15px"
                                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                sx={{
                                    "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                                }}
                            >
                                <TextField
                                    disabled
                                    fullWidth
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
                                    disabled
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
                                    label="Post"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.post}
                                    name="post"
                                    error={Boolean(touched.post) && Boolean(errors.post)}
                                    helperText={touched.post && errors.post}
                                    sx={{ gridColumn: "span 4" }}
                                />
                            </Box>
                            <Box display="flex"
                                justifyContent="center"
                                alignItems="center"
                                gap="1rem">
                                <Button
                                    onClick={handleClose}
                                    sx={{
                                        // border: "1px solid black",
                                        borderRadius: "0.5rem",
                                        m: "1.5rem 0rem",
                                        p: "0.5rem 5%",
                                        backgroundColor: "lightgray",
                                        color: "black",
                                        "&:hover": { color: "black" },
                                    }}
                                >
                                    <Typography fontFamily="monospace">
                                        Cancel
                                    </Typography>
                                </Button>
                                <Button
                                    type="submit"
                                    sx={{
                                        // border: "1px solid black",
                                        borderRadius: "0.5rem",
                                        m: "1.5rem 0rem",
                                        p: "0.5rem 5%",
                                        backgroundColor: "lightgray",
                                        color: "black",
                                        "&:hover": { color: "black" },
                                    }}
                                >
                                    <Typography fontFamily="monospace">
                                        Update
                                    </Typography>
                                </Button>
                            </Box>
                        </form>
                    )}</Formik>
            </Dialog>
        </Box>
    </>
}
export default EditPost