import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "dark",
    user: null,
    token: null,
    posts: [],
    users: [],
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setUsers: (state,action)=>{
            state.users += action.payload.users;
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null
            state.token = null;
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        }
    }
})

export const { setLogin, setLogout, setPosts,setUsers,setMode } = authSlice.actions;
export default authSlice.reducer;