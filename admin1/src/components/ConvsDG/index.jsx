import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import DeletePost from "../DeletePost";
// import Preview from "../preview";

const ConvsDG = () => {
    const token = useSelector((state) => state.token);
    const getRowId = (Convs) => {
        return Convs._id
    }
    const columns = [
        { field: 'createdAt', headerName: 'Created At', minWidth: 200, flex: 1 },
        { field: 'updatedAt', headerName: 'Updated At', minWidth: 150, flex: 1 },
        { field: '_id', headerName: 'Id', minWidth: 150, flex: 1 },
        { field: 'participants', headerName: 'Participants', minWidth:350, flex: 1, },
        { field: 'messages', headerName: 'Messages', minWidth: 400, flex: 1 },
        // {
        //     field: '',
        //     headerName: 'Actions',
        //     minWidth:60,
        //     flex: 1,
        //     renderCell: (params) => (<>
        //         {/* <DeletePost params={params}></DeletePost> */}
        //         {/* <Preview params={params}></Preview> */}
        //     </>
        //     ),
        // }
    ];
    const [Convs, setConvs] = useState([]);
    // const token = useSelector((state) => state.token);
    const getConvs = async () => {
        const getFeedRes = await fetch("http://localhost:3001/chats/", {
            method: "GET",
            headers: {Authorization: `Bearer ${token}`}
        });
        const data = await getFeedRes.json();
        console.log(data)
        setConvs(data);
    }

    useEffect(() => {
        getConvs();
    }, []);

    return <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
        <Typography sx={{ m: '1.5rem', fontSize: "1.5rem", fontWeight: "bold" }}>Conversations</Typography>
        <Box sx={{ width: '100%', height: "80vh" }}>
            <DataGrid
                rowSelection
                getRowId={getRowId}
                rows={Convs}
                columns={columns}
            />
        </Box>
    </Box>
}
export default ConvsDG