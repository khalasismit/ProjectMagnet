import { DataGrid } from "@mui/x-data-grid"
import DeleteUser from "../DeleteUser";
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import EditProfile from "../editProfile";

const UserDG = () => {
    const USERS = useSelector((state) => state.users)
    const token = useSelector(state=>state.token)
    const [users, setUser] = useState([]);
    const getRowId = (user) => {
        return user._id
    }
    const columns = [
        { field: 'createdAt', headerName: 'Created At', minWidth: 150 },
        { field: 'updatedAt', headerName: 'Updated At', minWidth: 150 },
        { field: '_id', headerName: 'Id', minWidth: 150 },
        { field: 'firstName', headerName: 'First Name', minWidth: 100 },
        { field: 'lastName', headerName: 'Last Name', minWidth: 100 },
        { field: 'userName', headerName: 'UserName', minWidth: 100 },
        // { field: 'bio', headerName: 'Bio', minWidth: 150 },
        { field: 'picturePath', headerName: 'Profile Pic', minWidth: 150 },
        { field: 'email', headerName: 'Email', minWidth: 150 },
        // { field: 'password', headerName: 'Password', minWidth: 150 },
        {
            field: '',
            headerName: 'Actions',
            minWidth: 100,
            renderCell: (params) => (<Box style={{ flex:1,display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <DeleteUser params={params}></DeleteUser>
                <EditProfile params={params}></EditProfile>
                {/* <EditUser params={params}></EditUser> */}
            </Box>
            ),
        },
    ];
    const getUsers = async () => {
        const getUsersRes = await fetch("http://localhost:3001/users", {
            method: "GET",
            headers:{Authorization: `Bearer ${token}`}
        });
        const data = await getUsersRes.json();
        setUser(data);
    }
    useEffect(() => {
        getUsers();
    }, [USERS]);
    return <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
    <Typography sx={{ m: '1.5rem', fontSize: "1.5rem", fontWeight: "bold" }}>Users</Typography>
    <Box sx={{ width: '100%', height: "80vh" }}>
        <DataGrid
            rowSelection
            getRowId={getRowId}
            rows={users}
            columns={columns}
        />
    </Box>
</Box>
}
export default UserDG