import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
// import DeletePost from "../DeletePost";
import Preview from "../preview";

const PostDG = () => {
    const getRowId = (post) => {
        return post._id
    }
    const columns = [
        { field: 'uploadDate', headerName: 'Upload Date', minWidth: 200, flex: 1 },
        { field: '_id', headerName: 'Id', minWidth: 150, flex: 1 },
        { field: 'originalName', headerName: 'Original Name', minWidth: 150, flex: 1 },
        { field: 'url', headerName: 'Url', minWidth: 300, flex: 1 },
        {
            field: '',
            headerName: 'Actions',
            minWidth:60,
            flex: 1,
            renderCell: (params) => (<>
                {/* <DeletePost params={params}></DeletePost> */}
                <Preview params={params}></Preview>
            </>
            ),
        }
    ];
    const [files, setFiles] = useState([]);
    // const token = useSelector((state) => state.token);
    const getFiles = async () => {
        const getFeedRes = await fetch("http://localhost:3001/files", {
            method: "GET",
        });
        const data = await getFeedRes.json();
        console.log(data)
        setFiles(data);
    }

    useEffect(() => {
        getFiles();
    }, []);

    return <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
        <Typography sx={{ m: '1.5rem', fontSize: "1.5rem", fontWeight: "bold" }}>Files</Typography>
        <Box sx={{ width: '100%', height: "80vh" }}>
            <DataGrid
                rowSelection
                getRowId={getRowId}
                rows={files}
                columns={columns}
            />
        </Box>
    </Box>
}
export default PostDG