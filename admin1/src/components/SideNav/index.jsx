import React, { useEffect, useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
// import Diversity2Icon from '@mui/icons-material/Diversity2';
// import TextsmsIcon from '@mui/icons-material/Textsms';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import AddBoxIcon from '@mui/icons-material/AddBox';
// import MenuIcon from '@mui/icons-material/Menu';
import WysiwygOutlinedIcon from '@mui/icons-material/WysiwygOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import { Avatar, Badge, Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
// import Mode from '../mode';
// import Create from '../create/index.jsx';
import Mode from '../mode/index.jsx';
import Logout from '../LogoutAdmin/index.jsx';
// import { useDispatch, useSelector } from 'react-redux';
// import { setNotifs } from '../../redux/reducers';
// import { io } from 'socket.io-client';

const SideNav = () => {
    // const dispatch = useDispatch();
    // const [newNotif, setNewNotif] = useState(useSelector(state => state.notifs));
    // const [newMessages, setNewMessages] = useState([]);
    // const handleContextMenu = (e) => {
    //     e.preventDefault();
    // };

    // const handleDragStart = (e) => {
    //     e.preventDefault();
    // };
    // const user = useSelector(state => state.user)
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const theme = useTheme();

    // useEffect(() => {
    //     // socket.on('connect', () => {
    //         //     socket.emit("authenticate", user._id);
    //         socket.on("notification", (data) => {
    //             setNewNotif(prevnewNotif => [...prevnewNotif, data])
    //             dispatch(setNotifs({ notifs: [...newNotif,data] }));
    //         })
    //         socket.on("receive_message",(data)=>{
    //             setNewMessages(prevnewMessages => [...prevnewMessages, data]);
    //         })
    //     // });
    //     return () => {
    //         socket.off("notification");
    //         socket.off("receive_messages");
    //         socket.close();
    //     }
    // }, [socket]);

    return <Box sx={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        // borderRadius: 4,
        height: isNonMobile ? "100vh" : "auto",
        width: isNonMobile ? "max-content" : "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "left",
        justifyContent: "space-between"
    }}>
        {isNonMobile && (
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                // borderRadius: "1rem 1rem 0rem 0rem",
                background: theme.palette.background.alt,
                p: "1.5rem 4rem",
                fontSize: "2rem",
                '& > *': {
                    color: theme.palette.neutral.dark,
                    cursor: 'pointer',
                }
            }}>
                <img src={"https://firebasestorage.googleapis.com/v0/b/magnet784492.appspot.com/o/logo%2Fmagnet3.png?alt=media&token=750dc1ef-316a-4bf3-8a83-8024f0a90dea"}
                    // onContextMenu={handleContextMenu}
                    // onDragStart={handleDragStart}
                    style={{ width: "5rem", height: "4rem", objectFit: "cover" }}
                />
                <Typography fontWeight="bold" fontSize="30px" color={theme.palette.neutral.dark} sx={{ lineHeight: "0px" }}>
                    Magnet
                </Typography>
            </Box>
        )}
        <Box sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
        }}>
            <Box sx={{
                flex: 1,
                display: "flex",
                // gap: "1rem",
                justifyContent: isNonMobile ? "" : "space-evenly",
                flexDirection: isNonMobile ? "column" : "row",
                padding: isNonMobile ? "1rem 0rem" : "0",
                boxShadow: isNonMobile ? "" : "0px -1px 5px rgba(0,0,0,0.1)",
                position: isNonMobile ? "" : "fixed",
                left: isNonMobile ? "" : "0",
                right: isNonMobile ? "" : "0",
                bottom: isNonMobile ? "" : "0",
                color: theme.palette.neutral.dark,
                zIndex: 100,
                background: theme.palette.background.alt,
                '& > *': {
                    borderRadius: 2,
                    p: "0.4rem 0.6rem", fontSize: "2rem"
                },
                '& > *:hover': {
                    color: "#333333",
                    background: "#A3A3A3", // Change the background color on hover
                    cursor: 'pointer', // Add a pointer cursor on hover
                },
            }}>
                <Link to={"/home"} style={{ textDecoration: "none", color: theme.palette.neutral.dark }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <HomeIcon titleAccess='Home' sx={{ fontSize: "2rem" }} />
                        {isNonMobile && (
                            <Typography>
                                Home
                            </Typography>
                        )}
                    </Box>
                </Link>
                <Link to={"/users"} style={{ textDecoration: "none", color: theme.palette.neutral.dark }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <PeopleOutlinedIcon titleAccess='Explore' sx={{ fontSize: "2rem" }} />
                        {isNonMobile && (
                            <Typography>
                                Users
                            </Typography>
                        )}
                    </Box>
                </Link>
                <Link to={"/posts"} style={{ textDecoration: "none", color: theme.palette.neutral.dark }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <WysiwygOutlinedIcon titleAccess='Search' sx={{ fontSize: "2rem" }} />
                        {isNonMobile && (
                            <Typography>
                                Posts
                            </Typography>
                        )}
                    </Box>
                </Link>
                <Link to={"/files"} style={{ textDecoration: "none", color: theme.palette.neutral.dark }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <ImageOutlinedIcon titleAccess='Search' sx={{ fontSize: "2rem" }} />
                        {isNonMobile && (
                            <Typography>
                                Files
                            </Typography>
                        )}
                    </Box>
                </Link>
                <Link to={"/conversations"} style={{ textDecoration: "none", color: theme.palette.neutral.dark }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <ForumOutlinedIcon titleAccess='Search' sx={{ fontSize: "2rem" }} />
                        {isNonMobile && (
                            <Typography>
                                Conversations
                            </Typography>
                        )}
                    </Box>
                </Link>
                <Link to={"/messages"} style={{ textDecoration: "none", color: theme.palette.neutral.dark }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <TextsmsOutlinedIcon titleAccess='Search' sx={{ fontSize: "2rem" }} />
                        {isNonMobile && (
                            <Typography>
                                Messages
                            </Typography>
                        )}
                    </Box>
                </Link>
                {/* <Create></Create> */}
                <Link to={"/register"} style={{ textDecoration: "none", color: theme.palette.neutral.dark }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <PersonAddOutlinedIcon titleAccess='Search' sx={{ fontSize: "2rem" }} />
                        {isNonMobile && (
                            <Typography>
                                Register
                            </Typography>
                        )}
                    </Box>
                </Link>
            </Box>

            {
                isNonMobile && (
                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        background: theme.palette.background.alt,
                        borderRadius: "0 0 1rem 1rem",
                    }}>
                        <Box sx={{
                            display: "flex",
                            flexDirection: isNonMobile ? "column" : "row",
                            boxShadow: isNonMobile ? "" : "0px -1px 5px rgba(0,0,0,0.1)",
                            color: theme.palette.neutral.dark,
                            zIndex: 100,
                            '& > *': {
                                borderRadius: 2,
                                p: "0.7rem 1rem"
                            },
                            '& > *:hover': {
                                color: "#333333",
                                background: "#A3A3A3",
                                cursor: 'pointer'
                            },
                        }}>
                            {/* <Link to={"/settings"} style={{ textDecoration: "none", color: theme.palette.neutral.dark }}> */}
                            {/* <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                                <MenuIcon titleAccess='Settings' sx={{ fontSize: "2rem" }} />
                                {isNonMobile && (
                                    <Typography>
                                        More
                                    </Typography>
                                )}
                            </Box> */}
                            {/* </Link> */}
                            <Logout></Logout>
                        </Box>
                        <Mode></Mode>
                    </Box>
                )
            }
        </Box >
    </Box >
};

export default SideNav;