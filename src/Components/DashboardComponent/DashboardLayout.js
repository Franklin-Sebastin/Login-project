import React, { useState } from 'react'
import { Outlet } from 'react-router'
import NavBar from './NavBar'
import SideBar from './SideBar'
import { Stack } from '@mui/material'

const DashboardLayout = () => {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  return (
    <div className='white-background'>
      <NavBar sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen}  />
      {sideBarOpen && <SideBar />} 
      <Stack style={{marginLeft:sideBarOpen ? "250px" : "0px",}}>
          <Outlet />
      </Stack>
    </div>
  )
}

export default DashboardLayout
