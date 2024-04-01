import { Alert, Box, Button, Dialog, Snackbar, Typography } from "@mui/material"
import * as React from 'react';
import { useDispatch } from "react-redux";
import { useState } from "react";
import { setLogout } from "../../redux/reducers";
import { useNavigate } from "react-router-dom";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
const Logout = () => {
    const navigate = useNavigate();
    const [snackbar, setSnackbar] = useState(false)
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleLogout = () => {
        setSnackbar(true)
        setTimeout(() => {
            setSnackbar(false)
            dispatch(setLogout())
            navigate("/AdminHome")
        }, 1500);
    }

    return <Box>
        <Snackbar
            open={snackbar}
            varient="filled"
            autoHideDuration={1500}
            anchorOrigin={{ vertical: 'bottom', horizontal: "left" }}
        ><Alert variant="filled" severity="success">Logout Successfully</Alert></Snackbar>
        <LogoutOutlinedIcon onClick={handleClickOpen} titleAccess='Logout' sx={{ m: "0rem 1rem" }} />
        <Dialog open={open} onClose={handleClose} sx={{ borderRadius: "1rem" }}>
            <Typography textAlign="center" m="1rem" fontFamily="monospace" fontSize="1.2rem" fontWeight="bold">Are you sure? You want to Logout.</Typography>
            <Box display="flex"
                justifyContent="center"
                alignItems="center"
                gap="1rem">
                <Button
                    onClick={handleClose}
                    sx={{
                        // border: "1px solid black",
                        borderRadius: "0.5rem",
                        m: "1rem 0rem",
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
                    onClick={handleLogout}
                    sx={{
                        // border: "1px solid black",
                        borderRadius: "0.5rem",
                        m: "0.5rem 0rem",
                        p: "0.5rem 5%",
                        backgroundColor: "lightgray",
                        color: "black",
                        "&:hover": { color: "black" },
                    }}
                >
                    <Typography fontFamily="monospace">
                        Logout
                    </Typography>
                </Button>
            </Box>

        </Dialog>
    </Box>
}
export default Logout;