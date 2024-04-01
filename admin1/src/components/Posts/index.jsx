import { Box,useMediaQuery } from "@mui/material"
// import Navigation from "../Navigation"
// import SidebarMini from "../Sidebar";
import PostDG from "../PostDG";

const Posts = () => {
    const NonMobile = useMediaQuery("(min-width:600px)");
    // const USERS = useSelector(state => state.users)
   
    return <Box>
        {/* <Navigation plateformName={plateformName} ></Navigation> */}
        <Box sx={{ display: "flex", alignItems: "start" }}>
            {/* <SidebarMini></SidebarMini> */}
            <Box sx={{width:NonMobile?"100%":"100%"}}>
                <PostDG></PostDG>
            </Box>
        </Box>
    </Box>
}
export default Posts