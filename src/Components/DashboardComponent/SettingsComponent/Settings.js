import React from 'react'
import {Typography,Container, Box} from "@mui/material"
import SettingsSideBar from './SettingsSideBar'

 
const Settings = () => {
  return (
  
    <Box sx={{margin:0,padding:0}}>
    <Typography variant="h5" sx={{ fontWeight:"bold",fontSize:"36px",fontFamily:"roboto",color:"#222222",marginLeft:"150px",padding:"20px"}}>
      Settings
  </Typography>
    <Container sx={{minWidth:"1400px",minHeight:"839px",border:"1px solid #EEEEEE",boxShadow:" 0px 3px 6px #00000040",borderRadius:"12px"}}>
        <SettingsSideBar/>
        
    </Container>
      
    </Box>
    
  )
}

export default Settings
