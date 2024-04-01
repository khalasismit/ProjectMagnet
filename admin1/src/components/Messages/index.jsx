import { Box,useMediaQuery } from "@mui/material"
import MsgDG from "../MsgDG";
const Messages = () => {
    const NonMobile = useMediaQuery("(min-width:600px)");
    // const USERS = useSelector(state => state.users)
   
    return <Box>
        {/* <Navigation plateformName={plateformName} ></Navigation> */}
        <Box sx={{ display: "flex", alignItems: "start" }}>
            {/* <SidebarMini></SidebarMini> */}
            <Box sx={{width:NonMobile?"100%":"100%"}}>
                <MsgDG></MsgDG>
            </Box>
        </Box>
    </Box>
}
export default Messages