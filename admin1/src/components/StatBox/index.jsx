import { Box, Typography, useTheme } from "@mui/material"

const StatBox = ({ title, subtitle, icon }) => {
    const theme = useTheme()
    return <Box sx={{ flex: 1, m: "1rem", display: "flex", flexDirection: "column", justifyContent: "space-between", borderRadius: "1rem" }} boxShadow={`0px 0px 5px 0px ${theme.palette.neutral.dark}`}>
        <Box sx={{flex:1, display: "flex", alignItems: "center", justifyContent: "space-between" }} >
            <Typography sx={{ flex:1,p: "0.5rem", fontSize: "1.5rem", fontWeight: "bold" }}>{title}</Typography>
            <Box p={"0.5rem"}>
                {icon}
            </Box>
        </Box>
        <Typography sx={{ p: "0.5rem", fontSize: "1.5rem" }}>{subtitle}</Typography>
    </Box>
}
export default StatBox;