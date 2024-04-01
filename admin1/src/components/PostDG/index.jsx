import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EditPosts from "../EditPosts";
import DeletePost from "../DeletePost";

const PostDG = () => {
    const POSTS = useSelector((state) => state.posts)
    const token = useSelector((state) => state.token)
    const getRowId = (post) => {
        return post._id
    }
    const columns = [
        { field: 'createdAt', headerName: 'Created At', minWidth: 100, flex: 1 },
        { field: 'updatedAt', headerName: 'Updated At', minWidth: 100, flex: 1 },
        { field: '_id', headerName: 'PostId', minWidth: 100, flex: 1 },
        { field: 'visibility', headerName: 'visibility', minWidth: 50, flex: 1 },
        { field: 'userId', headerName: 'UserId', minWidth: 150, flex: 1 },
        { field: 'caption', headerName: 'Caption', minWidth: 150, flex: 1 },
        { field: 'imageId', headerName: 'File Id', minWidth: 150, flex: 1 },
        { field: 'likes', headerName: 'LIkes', minWidth: 150, flex: 1 },
        { field: 'comments', headerName: 'Comments', minWidth: 150, flex: 1 },
        // { field: 'location', headerName: 'Location', minWidth: 150, flex: 1 },
        {
            field: '',
            headerName: 'Actions',
            minWidth: 100,
            flex: 1,
            renderCell: (params) => (<Box style={{flex:1,display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <DeletePost params={params}></DeletePost>
                <EditPosts params={params}></EditPosts>
            </Box>
            ),
        }
    ];
    const [posts, setPost] = useState([]);
    // const token = useSelector((state) => state.token);
    const getFeedPosts = async () => {
        const getFeedRes = await fetch("http://localhost:3001/posts/admin", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
        });
        const data = await getFeedRes.json();
        console.log(data)
        setPost(data);
    }
    useEffect(() => {
        getFeedPosts();
    }, [POSTS]);

    return <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
        <Typography sx={{ m: '1.5rem', fontSize: "1.5rem", fontWeight: "bold" }}>Posts</Typography>
        <Box sx={{ width: '100%', height: "80vh" }}>
            <DataGrid
                rowSelection
                getRowId={getRowId}
                rows={posts}
                columns={columns}
            />
        </Box>
    </Box>
}
export default PostDG