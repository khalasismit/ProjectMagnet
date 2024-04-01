import { Box,useMediaQuery } from "@mui/material"
import ConvsDG from "../ConvsDG";

const Convs = () => {
    const NonMobile = useMediaQuery("(min-width:600px)");
    // const USERS = useSelector(state => state.users)
   
    return <Box>
        {/* <Navigation plateformName={plateformName} ></Navigation> */}
        <Box sx={{ display: "flex", alignItems: "start" }}>
            {/* <SidebarMini></SidebarMini> */}
            <Box sx={{width:NonMobile?"100%":"100%"}}>
                <ConvsDG></ConvsDG>
            </Box>
        </Box>
    </Box>
}
export default Convs