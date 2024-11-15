import React, { useState } from 'react'
import {AppBar,IconButton,Toolbar,Box,InputBase,Badge,Avatar, Typography,Menu,MenuItem,Button} from "@mui/material"
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';
import Notifications from '@mui/icons-material/Notifications'
import {  useNavigate } from 'react-router';

const StyledToolbar=styled((Toolbar))({
    display:"flex",
    justifyContent:"space-between",
    textAlign:"center",
});

const Search=styled(("div"))({
    display:"flex",
    justifyContent:"flex-start",
    alignItems:"center",
    backgroundColor:"#F7F7F7 ",
    borderRadius:"16px",    
    width:"400px",
    height:"48px",   
   
});
const Icons=styled((Box))(({theme})=>({
    display:"none",
    alignItems:"center",
    gap:"30px",
    color:"#1C7BDF",
    [theme.breakpoints.up("sm")]:{
        display:"flex",
    }
    
}))
const AvatarBox=styled((Box))(({theme})=>({
    display:"flex",
    alignItems:"center",
    [theme.breakpoints.up("sm")]:{
        display:"none"
    }
}))

const RotateIcon=styled((Box))(({clicked})=>({
    transition:"transform 0.3s linear",
    transform:clicked? "rotate(45deg)" : "rotate(0deg)",
}))


const NavBar = ({ sideBarOpen, setSideBarOpen} ) => {
    const [clicked,setClicked]=useState(false);
    const [addOpen,setAddOpen]=useState(false);
    const [anchorEl,setAnchorEl]=useState(null);
    const navigate = useNavigate()


    const toggleIcon=(event)=>{
        setClicked((prev)=>!prev);
        setAddOpen(true);
        setAnchorEl(event.currentTarget);
    }
    const handleClose = () => {
        setAddOpen(false);
        setClicked(false); 
    };

    const toggleSideBar=()=>{
        setSideBarOpen((prev)=>!prev);
    }

    const handleSettingBar=()=>{
        navigate('/settings');
    }
    const handleLogout = () => {
        localStorage.setItem("isLoggedIn", "false");
        
        console.log("User logged out.");
        navigate("/"); // Redirect to login
      };
  return (
    <>    
   
    <AppBar position='sticky' sx={{ borderRadius:"16px",marginBottom:0,
        backgroundColor:"#FFFFFF",boxShadow:"0px 3px 6px #00000029"}}>
        <StyledToolbar>

            <IconButton size='large' edge='start' onClick={toggleSideBar}>        
                <MenuIcon/>
            </IconButton>
            {/* <Box component="img" src='./../../src/assets/Profile.png' alt='image not found'/> */}

            <Search>
                <SearchIcon sx={{width:"20px",height:"20px",color:"#000000",opacity:0.3,paddingX:"10px"}}/> 
                <InputBase placeholder='Search'/>
            </Search>

            <Icons>
                <RotateIcon clicked={clicked} onClick={toggleIcon} >
                    <AddIcon/> 
                </RotateIcon>
                <Menu
                    id="demo-positioned-menu"
                    aria-labelledby="demo-positioned-button"
                    anchorEl={anchorEl}
                    open={addOpen}
                    onClose={handleClose}
                    anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                    }}
                    transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                    }} 
                    // sx={{width:"255px", height:"204px",boxShadow: "5px 5px 30px #0000004D",borderRadius:"16px" ,}}                                 
                >
                        <MenuItem >Add New Job Requisition</MenuItem>
                        <MenuItem >Add New Candidate</MenuItem>
                        <MenuItem >Add New User</MenuItem>
                </Menu>

                <SettingsIcon onClick={handleSettingBar}/>

                <Badge badgeContent={3} color="error">
                    <Notifications />
                </Badge>

                <Avatar sx={{width:30,height:30,border:"2px solid #1C7BDF"}}/>
                <Button variant="contained" color="primary" onClick={handleLogout} sx={{borderRadius:"10px",textTransform:"none",fontWeight:"bold"}}>
                            Log Out
                     </Button>
               
            </Icons>

            <AvatarBox>
                <Avatar sx={{width:30,height:30,border:"2px solid #1C7BDF"}}/>
                <Typography variant='body2' component='span'>Frank</Typography>
            </AvatarBox>
        </StyledToolbar>  
        
    </AppBar>

    </>


  );
};

export default NavBar;
