import React,{useState} from "react";
import { Box, FormLabel, Stack, TextField, Typography,Button,IconButton } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer, toast,Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 


const validationSchema=yup.object({
  email:yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
password:yup
    .string()
    .min(6,"atleast 6 characters")
    .matches(/[a-zA-Z]/,"Password must conatain atleast one letter")
    .matches(/[0-9]/,"Password must contain atleast one digit")
    .required("Password is required"),
});
const LogIn = () => {
  const [showPassword,setShowPassword]=useState(false);
  const navigate=useNavigate();
  const togglePassword=()=>{
    setShowPassword(prev=>!prev);
  }
  const formik=useFormik({
    initialValues:{
      email:"",
      password:"",
    },
    validationSchema:validationSchema,
    onSubmit:(values)=>{
      const storedEmail=localStorage.getItem("email")?.trim();
      const storedPassword=localStorage.getItem("password")?.trim();
      console.log("Stored Email:", storedEmail);
      console.log("Stored Password:", storedPassword);
      if(values.email===storedEmail && values.password===storedPassword){
          toast.success("Login successful! Redirecting...");
          localStorage.setItem("isLoggedIn", "true");
          setTimeout(()=>{
            navigate("/dashboard");
          },2000);
      }
      else{
        toast.error("Invalid credentials");
      }
    }
  });

  return (
    
      <Box 
        sx={{
          width: "496px",
          height: "496px",
          margin: "100px auto",
          fontFamily: "roboto",
          boxShadow: "0px 3px 6px #00000029",
          backgroundColor: "#FFFFFF",
          borderRadius: "16px",
          opacity: 1,
          
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "32px",
            color: "#222222",
            padding: 4,
          }}
        >
          Log In To Your Account
        </Typography>

        <form onSubmit={formik.handleSubmit}>
        <Stack spacing={4} sx={{ paddingLeft: 8 }}>
          <Stack>
            <FormLabel
              htmlFor="email"
              sx={{ color: "#222222", fontWeight: "bold", fontSize: "12px",characterSpacing:0,lineSpacing:14 }}
            >
              Company Email <Typography component="span" sx={{fontWeight:"Bold", color:"#FF0000",fontSize:"12px",characterSpacing:0,lineSpacing:14}}> *</Typography>
            </FormLabel>
            <TextField
              id="email"
              name="email"
              sx={{
                width: "368px",
                height: "48px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Stack>

          <Stack>
            <FormLabel
              htmlFor="password"
              sx={{ color: "#222222", fontWeight: "bold",fontSize: "12px",characterSpacing:0,lineSpacing:14}}
            >
              Password <Typography component="span" sx={{fontWeight:"Bold", color:"#FF0000",fontSize:"12px",characterSpacing:0,lineSpacing:14}}> *</Typography>
            </FormLabel>
            <TextField
              id="password"
              name="password"
              type={showPassword? "text":"password"}
              sx={{ width: "368px", height: "48px" ,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
              InputProps={{
                endAdornment: (
    
                  <IconButton onClick={togglePassword} edge="end" sx={{color:"#1C7BDF"}}>
                    {showPassword ? <VisibilityIcon/> :< VisibilityOffIcon/>}
                  </IconButton>
                ),
              }}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            
            />
            
          </Stack>

          <Stack>
            <Link to="/forgot-password" style={{color:"#27C69E",fontWeight:"Bold",fontSize:"14px",textDecoration:"none",textAlign:"right",marginRight:"58px"}}>Forgot Password?</Link>
          </Stack>

          <Stack>
            <Button type="submit" variant="contained" sx={{borderRadius:"24px", width: "368px",opacity:1,backgroundColor:"#1C7BDF",
                height: "48px",textTransform:"none",fontWeight:"bold",fontSize:"15px" }}>Log In</Button>
          </Stack>
          </Stack>
            <Typography sx={{textAlign:"center",marginTop:6,fontSize:"14px"}}>
              Don't have an account?<Link to="/sign-up" style={{color:"#27C69E",fontWeight:"Bold",textDecoration:"none"}}>Sign Up</Link>
            </Typography>
          
      
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
                              theme="light"
                              transition={Bounce}
                              />
      </Box>

  );
};

export default LogIn;
