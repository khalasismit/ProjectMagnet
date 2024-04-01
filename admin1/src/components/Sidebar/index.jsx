import React from 'react'
import './SidebarMini.css'
import SidebarRowMini from './SidebarRowMini';
import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
// import FileDownloadIcon from '@mui/icons-material/FileDownloadOutlined';
import WysiwygOutlinedIcon from '@mui/icons-material/WysiwygOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
function SidebarMini() {
  const navigate = useNavigate()
  return (
    <Box className='sidebarMini'>
      <Box onClick={() => { navigate("/admin") }}>
        <SidebarRowMini Icon={HomeIcon} title='Home' />
      </Box>
      <Box onClick={() => { navigate("/users") }}>
        <SidebarRowMini Icon={GroupsIcon} title="Users" />
      </Box>
      <Box onClick={() => { navigate("/posts") }}>
        <SidebarRowMini Icon={WysiwygOutlinedIcon} title="Posts" />
      </Box>
      <Box onClick={() => { navigate("/register") }}>
        <SidebarRowMini Icon={PersonAddAltOutlinedIcon} title="AddUser" />
      </Box>
      {/* <SidebarRowMini Icon={FileDownloadIcon} title="Download" /> */}
    </Box>
  )
}

export default SidebarMini