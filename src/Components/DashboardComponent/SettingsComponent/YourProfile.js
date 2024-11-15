import React, { useState } from 'react'
import { useRef } from 'react';
import { Box, Typography, Stack, FormLabel, TextField,Button,InputLabel,Select,MenuItem,Avatar } from "@mui/material";
import {useFormik} from "formik";
import * as yup from 'yup';
import { ToastContainer, toast,Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const maxFileSize=100*1024;

const validationSchema=yup.object({
    fname:yup
        .string()
        .required("Enter First name"),
    lname:yup  
        .string()
        .required("Enter Last name"),
    role:yup
        .string()
        .required("Role is required"),
    jobtitle:yup    
        .string()
        .required("Enter Job Title"),
    location:yup
        .string()
        .required("Location is required"),  
    avatar:yup  
        .mixed()
        .required("Image is required")
        .test("fileSize","FileSize should be less than 100kb",(file)=>{return file? file.size<=maxFileSize :true;}),
    
});

const YourProfile = () => {
    const [previewUrl, setPreviewUrl] = useState(null);
    const [fileName,setFileName] =useState(null);
    const fileInputRef=useRef(null);
   

    const handleAvatarClick=()=>{
        fileInputRef.current.click();
    }
    const handleFileChange=(event)=>{
        const file=event.target.files[0];
        if (file){
            formik.setFieldValue("avatar",file);
            setFileName(file.name);

            const reader = new FileReader();
            reader.onload = (e) => {
              setPreviewUrl(e.target.result);
            };
            reader.readAsDataURL(file);
          }
    }

    const formik=useFormik({
        initialValues:{
            avatar:null,
            fname:"",
            lname:"",
            role:"",
            jobtitle:"",
            location:"",
        },
        validationSchema:validationSchema,
        onSubmit:(values)=>{
            if(values){ 
                    localStorage.setItem("profile data",JSON.stringify(values));
                    toast.success("Login successful! Redirecting...");
                    // alert("Your Profile was created successfully!");
                    }; 
                     
            }
    });
    return (
        <Box sx={{paddingLeft:"10px"}}>
            <Typography variant='h5' sx={{ fontWeight: "bold", fontSize: "24px", fontFamily: "robotto", color: "#222222" }}> Your Profile</Typography>
            
            <Avatar name="avatar" onClick={handleAvatarClick}  src={previewUrl }
            sx={{width:"160px",height:"160px",backgroundColor:"#F7F7F7",margin:"15px"}}/>
            <input type="file" style={{display:"none"}} ref={fileInputRef} onChange={handleFileChange} accept='image/*'/>

            {(formik.touched.avatar && formik.errors.avatar) || fileName ? (
                    <Typography
                        variant="caption"
                        color={formik.errors.avatar ? "error" : "blue"}
                        sx={{ marginLeft: "50px", marginBottom: "10px" }}
                    >
                        {formik.errors.avatar || `Selected File: ${fileName}`}
                    </Typography>
                    ) : null}

            
            <form onSubmit={formik.handleSubmit}>
            <Stack spacing={5}>
                <Stack sx={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                    <Stack>
                    <FormLabel htmlFor='fname'
                        sx={{
                            fontWeight: "bold",
                            fontSize: "12px",
                            color: "#222222",
                        }}>
                        First name  <Typography
                            component="span"
                            sx={{
                                fontWeight: "bold",
                                color: "#FF0000",
                                fontSize: "12px",
                            }}
                        > *
                        </Typography>
                    </FormLabel>

                    <TextField id="fname"
                    name="fname"
                     sx={{
                        width: 175,
                        height: 48,
                        opacity: 1,
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "8px",
                        },
                    }} 
                    value={formik.values.fname}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.fname && Boolean(formik.errors.fname)}
                    helperText={formik.touched.fname && formik.errors.fname}
                    />
                    </Stack>

                    <Stack>
                    <FormLabel htmlFor='lname'
                        sx={{
                            fontWeight: "bold",
                            fontSize: "12px",
                            color: "#222222",
                        }}>
                        Last name  <Typography
                            component="span"
                            sx={{
                                fontWeight: "bold",
                                color: "#FF0000",
                                fontSize: "12px",
                            }}
                        > *
                        </Typography>
                    </FormLabel>

                    <TextField id="lname"
                    name="lname"
                    sx={{
                        width: 175,
                        height: 48,
                        opacity: 1,
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "8px",
                        },
                    }}
                    value={formik.values.lname}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.lname && Boolean(formik.errors.lname)}
                    helperText={formik.touched.lname && formik.errors.lname}
                    />
                    </Stack>
                </Stack>

                <Stack>
                    <InputLabel id='role'
                        sx={{
                            fontWeight: "bold",
                            fontSize: "12px",
                            color: "#222222",
                        }}>
                       Role  <Typography
                            component="span"
                            sx={{
                                fontWeight: "bold",
                                color: "#FF0000",
                                fontSize: "12px",
                            }}
                        > *
                        </Typography>
                    </InputLabel>

                    <Select
                            labelId="role"
                            label="Recruiter"
                            name="role"
                            value={formik.values.role}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.role && Boolean(formik.errors.role)}
                        >
                            <MenuItem value={1}>Recruiter,HR/TA Manager, Hiring Manger</MenuItem>
                            <MenuItem value={2}>Manger</MenuItem>
                            <MenuItem value={3}>Developer</MenuItem>
                    </Select>
                    {formik.touched.role && formik.errors.role && (
                        <Typography color="error" variant="caption">
                            {formik.errors.role}
                        </Typography>)}
                </Stack>

                <Stack>
                    <FormLabel htmlFor='jobtitle'
                        sx={{
                            fontWeight: "bold",
                            fontSize: "12px",
                            color: "#222222",
                        }}>
                       Job Title  <Typography
                            component="span"
                            sx={{
                                fontWeight: "bold",
                                color: "#FF0000",
                                fontSize: "12px",
                            }}
                        > *
                        </Typography>
                    </FormLabel>

                    <TextField
                                id="jobtitle"
                                name="jobtitle"
                                sx={{
                                    width: 368,
                                    height: 48,
                                    opacity: 1,
                                    "& .MuiOutlinedInput-root": {
                                    borderRadius: "8px",
                                    },
                                }}
                                value={formik.values.jobtitle}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.jobtitle && Boolean(formik.errors.jobtitle)}
                                helperText={formik.touched.jobtitle && formik.errors.jobtitle}
                     />
                </Stack>

                <Stack>
                    <InputLabel id='location'
                        sx={{
                            fontWeight: "bold",
                            fontSize: "12px",
                            color: "#222222",
                        }}>
                       Location & Time Zone  <Typography
                            component="span"
                            sx={{
                                fontWeight: "bold",
                                color: "#FF0000",
                                fontSize: "12px",
                            }}
                        > *
                        </Typography>
                    </InputLabel>

                    <Select
                            labelId="location"
                            label="Recruiter"
                            name="location"
                            value={formik.values.location}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.location && Boolean(formik.errors.location)}
                        >
                            <MenuItem value={1}>UTC -07:00 Los Angeles</MenuItem>
                            <MenuItem value={2}>Netherland</MenuItem>
                            <MenuItem value={3}>South Korea</MenuItem>
                    </Select>
                    {formik.touched.location && formik.errors.location && (
                        <Typography color="error" variant="caption">
                            {formik.errors.location}
                        </Typography>)}
                </Stack>

                <Stack>
                <Button
                    type="submit"
                    variant="contained"
                    sx={{
                    width: 368,
                    height: 48,
                    background: "#1C7BDF",
                    fontWeight:"bold",
                    color: "#fff",
                    borderRadius: "24px",
                    textTransform: "none",
                    }}
                >
                    Save Changes
                </Button>

                </Stack>
            </Stack>
            
            </form>

            <ToastContainer
                              position="top-center"
                              autoClose={5000}
                              hideProgressBar={false}
                              newestOnTop={false}
                              closeOnClick
                              rtl={false}
                              pauseOnFocusLoss
                              draggable
                              pauseOnHover
                              theme="dark"
                              transition={Bounce}
                              />
        </Box>
    )
}

export default YourProfile
