import React from 'react'
import { Box,List,ListItem,ListItemButton,ListItemText } from '@mui/material'

const SideBar = () => {
  return (
    <Box sx={{position:"fixed",width:"256px",height:"992px",borderRadius:" 0px 16px 16px 0px",
                    background: "linear-gradient(180deg, #27C69E 0%, #1C7BDF 100%)"}}>
         <List >
          <ListItem disablePadding>
            <ListItemButton sx={{color:"#FFFFFF"}}>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component="a" href="#Create-new-requisition" sx={{color:"#FFFFFF",}}>
              <ListItemText primary="Create New Requisition" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component="a" href="#Requisition-dashboard" sx={{color:"#FFFFFF"}}> 
              <ListItemText primary="Requisition Dashboard" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component="a" href="#Recruitment-dashboard" sx={{color:"#FFFFFF"}}>
              <ListItemText primary="Recruitment Dashboard" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component="a" href="#Resume-search" sx={{color:"#FFFFFF"}}>
              <ListItemText primary="Resume Search" />
            </ListItemButton>
          </ListItem>

        </List>
    </Box>
  )
}

export default SideBar
