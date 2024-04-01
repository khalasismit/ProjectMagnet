import { useEffect, useState } from "react"
import StatBox from "../StatBox"
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
const TotalUser = () => {
    const token = useSelector((state) => state.token)
    const [count, setCount] = useState([])
    const getTotalFiles = async () => {
        const res = await fetch("http://localhost:3001/files", {
            method: "GET",
            headers:{Authorization: `Bearer ${token}`}
        })
        const totalUser = await res.json()
        setCount(totalUser)
    }
    useEffect(() => {
        getTotalFiles();
    }, [])

    return <Box sx={{flex:1}}>
        <StatBox title={"Files"} subtitle={count.length} icon={<ImageOutlinedIcon />}></StatBox>
    </Box>
}
export default TotalUser