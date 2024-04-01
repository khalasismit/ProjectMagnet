import { Box, Divider } from "@mui/material"
import Register from "../../components/Register";
import AddAdmin from "../../components/AddAdmin";
const New = ()=>{
    return (
        <Box sx={{display:"flex",alignItems:"center",justifyContent:"center",flex:1}}>
            <Register></Register>
            <Divider orientation="vertical" flexItem variant="middle"> Or</Divider>
            <AddAdmin></AddAdmin>
        </Box>
    )
}
export default New