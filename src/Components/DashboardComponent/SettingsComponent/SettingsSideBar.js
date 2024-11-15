import React, { useState } from 'react'
import { Box,Tab} from '@mui/material'
import {TabContext,TabList,TabPanel} from '@mui/lab'
import YourProfile from './YourProfile';
import ChangePassword from './ChangePassword';
import ManageUsers from './ManageUsers';
import Agencies from './Agencies';
import EmailTemplates from './EmailTemplates';

const SettingsSideBar = () => {
    const [value,setValue]=useState("1");
    const handleChange=(event,newValue)=>{
        setValue(newValue);
    }
    const tabStyle={width:"230px",height:"48px",backgroundColor:"#F7F7F7",color:"#222222",borderRadius:"12px",margin:"5px",textTransform:"none",
            '&.Mui-selected':{backgroundColor:"#1C7BDF",color:"#F7F7F7"}
    };
  return (

    <Box sx={{display:"flex",flexDirection:"row",marginTop:"25px",width:"100%"}}>
        <TabContext  value={value} >
            <Box sx={{ width:"240px",height:"512px"}}>
                <TabList orientation="vertical" onChange={handleChange}  sx={{'.MuiTabs-indicator':{display:"none"}}} >
                    <Tab label="Your Profile" value="1" sx={tabStyle}/>
                    <Tab label="Change Password" value="2" sx={tabStyle}/>
                    <Tab label="Manage Users" value="3" sx={tabStyle}/>
                    <Tab label="Email Templates" value="4" sx={tabStyle}/>
                    <Tab label="Offer Templates" value="5" sx={tabStyle}/>
                    <Tab label="Work Locations" value="6" sx={tabStyle}/>
                    <Tab label="Departments" value="7" sx={tabStyle}/>
                    <Tab label="Job Publishing" value="8" sx={tabStyle}/>
                    <Tab label="Agencies" value="9" sx={tabStyle}/>
                </TabList>
            </Box>
            <TabPanel value='1'>
                <YourProfile/>
            </TabPanel>
            <TabPanel value='2'>
                <ChangePassword/>
            </TabPanel>
            <TabPanel value='3'>
                <ManageUsers/>
            </TabPanel>
            <TabPanel value='4'>
                <EmailTemplates/>
            </TabPanel>
            <TabPanel value='9'>
                <Agencies/>
            </TabPanel>
        </TabContext>

    </Box>
  )
}

export default SettingsSideBar
