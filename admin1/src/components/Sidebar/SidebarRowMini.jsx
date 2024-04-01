import React from 'react'
import './SidebarRowMini.css'
import { Box, Typography } from '@mui/material'
function SidebarRowMini({Selected,Icon,title}) {
  return (
    <Box className='sidebarRowMini'>
      <Box className={`sidebarRowMini__row ${Selected && 'Selected'}`}>
        <Icon className='sidebarRowMini__icon' />
        <Typography className='sidebarRowMini__title'>{title}</Typography>
      </Box>
    </Box>
  )
}

export default SidebarRowMini