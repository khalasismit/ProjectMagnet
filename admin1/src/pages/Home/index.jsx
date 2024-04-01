import { Box, useMediaQuery } from "@mui/material"
// import Navigation from "../../components/Navigation"
import TotalUser from "../../components/TotalUser"
import TotalPost from "../../components/TotalPost"
import TotalFiles from "../../components/TotalFiles"
// import SidebarMini from "../../components/Sidebar"
import UserDG from "../../components/UserDG"
import PostDG from "../../components/PostDG"
// import SideNav from "../../components/SideNav"

const HomePage = () => {
    return <Box sx={{flex:1}}>
        <Box sx={{
            display: "flex",
            justifyContent: "space-between",
        }} >
            <Box sx={{ flex: 1 }}>
                <TotalUser></TotalUser>
            </Box>
            <Box sx={{ flex: 1 }}>
                <TotalFiles></TotalFiles>
            </Box>
            <Box sx={{ flex: 1 }}>
                <TotalPost></TotalPost>
            </Box>
        </Box>
        <Box sx={{display:"flex",flexDirection:'column'}}>
        <UserDG></UserDG>
        <PostDG></PostDG>
        </Box>
    </Box>
}
export default HomePage