import { Box,useMediaQuery } from "@mui/material"
// import Navigation from "../Navigation"
// import SidebarMini from "../Sidebar";
import FilesDG from "../FilesDG";

const Files = () => {
    const NonMobile = useMediaQuery("(min-width:600px)");
    // const USERS = useSelector(state => state.users)
   
    return <Box>
        {/* <Navigation plateformName={plateformName} ></Navigation> */}
        <Box sx={{ display: "flex", alignItems: "start" }}>
            {/* <SidebarMini></SidebarMini> */}
            <Box sx={{width:NonMobile?"100%":"100%"}}>
                <FilesDG></FilesDG>
            </Box>
        </Box>
    </Box>
}
export default Files