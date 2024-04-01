import { useEffect, useState } from "react"
import StatBox from "../StatBox"
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
const TotalUser = () => {
    const USERS = useSelector((state) => state.users)
    const token = useSelector((state) => state.token) 
    const [count, setCount] = useState([])
    const getTotalUser = async () => {
        const res = await fetch("http://localhost:3001/users", {
            method: "GET",
            headers:{Authorization: `Bearer ${token}`}
        })
        const totalUser = await res.json()
        setCount(totalUser)
    }
    useEffect(() => {
        getTotalUser();
    }
        //eslint-disable-next-line
        , [USERS])

    return <Box sx={{flex:1}}>
        <StatBox title={"Users"} subtitle={count.length} icon={<PersonOutlineOutlinedIcon />}></StatBox>
    </Box>
}
export default TotalUser