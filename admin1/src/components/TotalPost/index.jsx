import { useEffect, useState } from "react";
import StatBox from "../StatBox";
import { useSelector } from "react-redux";
import WysiwygOutlinedIcon from '@mui/icons-material/WysiwygOutlined';

const TotalPost = () => {
    const POSTS = useSelector((state) => state.posts)
    const token = useSelector((state) => state.token)
    const [count, setCount] = useState([])
    const getTotalPosts = async () => {
        const totalPostRes = await fetch("http://localhost:3001/posts/admin", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const data = await totalPostRes.json();
        setCount(data);
        console.log(data)
    }
    useEffect(() => {
        getTotalPosts()
    }, [POSTS])//eslint-disable-line

    return <>
        <StatBox title={"Posts"} subtitle={count.length} icon={<WysiwygOutlinedIcon />}></StatBox>
    </>
}
export default TotalPost;