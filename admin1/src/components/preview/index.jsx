import { Avatar, Box,useTheme } from "@mui/material"
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
// import { setLogin } from "../../redux/reducers";
import { useState } from "react";
import PreviewOutlinedIcon from '@mui/icons-material/PreviewOutlined';
const Preview = ({ params }) => {
    console.log(params)
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return <Box>
        {/* <Box sx={{ display: "flex", alignItems: "center", gap: "1rem", color: theme.palette.neutral.dark }} onClick={handleClickOpen}> */}
        <Box sx={{ cursor: "pointer", background: theme.palette.background.alt, borderRadius: "50%", p: "0.5rem 0.5rem 0.1rem 0.5rem", ":hover": { background: theme.palette.background.default } }} onClick={handleClickOpen}>
            <PreviewOutlinedIcon />
        </Box>
        <Dialog open={open} onClose={handleClose}>
            <Avatar src={params.row.url} sx={{
                width: "100%", height: "30rem", cursor: "pointer",
                borderRadius: "1%"
            }} />

        </Dialog>
    </Box >
}

export default Preview
