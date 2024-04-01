import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import DeletePost from "../DeletePost";
// import Preview from "../preview";

const MsgDG = () => {
    const token = useSelector((state) => state.token);
    console.log("token: ",token);
    const getRowId = (Msgs) => {
        return Msgs._id
    }
    const columns = [
        { field: 'createdAt', headerName: 'Created At', minWidth: 200, flex: 1 },
        { field: 'updatedAt', headerName: 'Updated At', minWidth: 150, flex: 1 },
        { field: '_id', headerName: 'Id', minWidth: 100, flex: 1 },
        { field: 'conversationId', headerName: 'Conversation Id', minWidth: 100, flex: 1 },
        { field: 'senderId', headerName: 'Sender Id', minWidth: 150, flex: 1 },
        { field: 'receiverId', headerName: 'Receiver Id', minWidth: 150, flex: 1 },
        { field: 'message', headerName: 'Message', minWidth:400, flex: 1, },
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
    const [Msgs, setMsgs] = useState([]);
    // const token = useSelector((state) => state.token);
    const getMsg = async () => {
        const getFeedRes = await fetch("http://localhost:3001/chats/messages/all", {
            method: "GET",
            headers: {Authorization: `Bearer ${token}`}
        });
        const data = await getFeedRes.json();
        console.log(data)
        setMsgs(data);
    }

    useEffect(() => {
        getMsg();
    }, []);

    return <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
        <Typography sx={{ m: '1.5rem', fontSize: "1.5rem", fontWeight: "bold" }}>Messages</Typography>
        <Box sx={{ width: '100%', height: "80vh" }}>
            <DataGrid
                rowSelection
                getRowId={getRowId}
                rows={Msgs}
                columns={columns}
            />
        </Box>
    </Box>
}
export default MsgDG