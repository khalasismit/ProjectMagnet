// import AdminPanel from "./pages/AdminDashboard";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import Users from "./components/Users"
import Posts from "./components/Posts"
// import Navigation from "./components/Navigation"
// import ProfilePage from "./pages/ProfilePage";
// import SearchPage from "./pages/SearchPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./components/Register"
import { themeSettings } from "./theme/theme"
import { Box, createTheme, useMediaQuery } from "@mui/material";
import SideNav from "./components/SideNav";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useMemo } from "react";
import Files from "./components/Files";
import AuthPage from "./pages/authPage";
import New from "./pages/New";
import Convs from "./components/Convs";
import Messages from "./components/Messages";
function App() {

  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isNonMobile = useMediaQuery("(min-width:600px)")
  const Name = "TweetVerse";
  const user = useSelector(state => state.user)
  const token = useSelector(state => state.token)
  const isAuth = Boolean(token && user);
  return (
    // <div className="App">
    <BrowserRouter>
      {/* <Box sx={{ maxWidth: "100vw", display: "flex" }} flexDirection={isNonMobile ? "row" : "column-reverse"} gap={isNonMobile ? "2rem" : ""}> */}
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={isAuth ? <Navigate to={"/home"}></Navigate> : <AuthPage />} />
        </Routes>
        <Box display={'flex'} flexDirection={isNonMobile ? "row" : "column-reverse"} gap={isNonMobile ? "2rem" : ""}>
          {
            isAuth &&
            <SideNav></SideNav>
          }
          <Routes>
            <Route path="/home" element={isAuth ? <Home plateformName={Name} /> : <Navigate to={"/"}></Navigate>} />
            <Route path="/users" element={isAuth ? <Users plateformName={Name} /> : <Navigate to={"/"}></Navigate>} />
            <Route path="/posts" element={isAuth ? <Posts plateformName={Name} /> : <Navigate to={"/"}></Navigate>} />
            <Route path="/files" element={isAuth ? <Files plateformName={Name} /> : <Navigate to={"/"}></Navigate>} />
            <Route path="/conversations" element={isAuth ? <Convs plateformName={Name} /> : <Navigate to={"/"}></Navigate>} />
            <Route path="/messages" element={isAuth ? <Messages plateformName={Name} /> : <Navigate to={"/"}></Navigate>} />
            <Route path="/register" element={isAuth ? <New /> : <Navigate to={"/"}></Navigate>} />
            {/* <Route path="/profile" element={isAuth ? <ProfilePage plateformName={Name} /> : <Navigate to={"/"}></Navigate>}></Route> */}
            {/* <Route path="/search" element={isAuth ? <SearchPage plateformName={Name} /> : <Navigate to={"/"}></Navigate>}></Route> */}
          </Routes>
        </Box>
      </ThemeProvider>
      {/* </Box> */}
    </BrowserRouter>
    // </div>
  );
}

export default App;
