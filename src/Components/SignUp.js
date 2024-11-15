import React, { useState } from "react";
import * as yup from "yup";
import { Typography,Box,TextField,Button, IconButton,Stack,Checkbox,FormControlLabel,FormLabel,InputAdornment} from "@mui/material";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "atleast 6 characters")
    .matches(/[a-zA-Z]/, "Password must conatain atleast one letter")
    .matches(/[0-9]/, "Password must contain atleast one digit")
    .required("Password is required"),
  password1: yup
    .string()
    .oneOf([yup.ref("password"), null], "Mismatch password")
    .required("Confirm password is required"),
  accept:yup
    .boolean()
    .oneOf([true],"You should accept the Terms and Conditions"),
});

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const navigate=useNavigate();

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  const togglePassword1 = () => {
    setShowPassword1((prev) => !prev);
  };

 
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      password1: "",
      accept:false,
    },
    validationSchema: validationSchema,
    onSubmit: (values,{resetForm}) => {
      if(values.accept)
      {
      localStorage.setItem("email", values.email);
      localStorage.setItem("password", values.password);
      alert("Form submitted successfully!");
      resetForm();
      navigate("/");
      }  
  },
  });

  return (
    <Box
      sx={{
        width: "496px",
        // width:{
        //    xs: "99%",  md: "496px"
        // },
        height: "580px",
        margin: "70px auto",
        fontFamily: "roboto",
        boxShadow: "0px 3px 6px #00000029",
        backgroundColor: "#FFFFFF",
        borderRadius: "16px",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "32px",
          color: "#222222",
          padding: 4,
        }}
      >
        Create an Account
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={4} sx={{ paddingLeft: 8 }}>
          <Stack>
            <FormLabel
              htmlFor="email"
              sx={{
                fontWeight: "bold",
                fontSize: "12px",
                color: "#222222",
              }}
            >
              Company Email
              <Typography
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
              id="email"
              type="email"
              name="email"
              sx={{
                width: 368,
                height: 48,
                opacity: 1,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
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
              sx={{
                fontWeight: "bold",
                fontSize: "12px",
                color: "#222222",
                textAlign: "left",
                opacity: 1,
              }}
            >
              Password
              <Typography
                component="span"
                sx={{ fontWeight: "Bold", color: "#FF0000", fontSize: "12px" }}
              >
                *
              </Typography>
            </FormLabel>
            <TextField
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              sx={{
                width: "368px",
                height: 48,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={togglePassword}
                        onMouseDown={handleMouseDownPassword}
                        // onMouseUp={handleMouseUpPassword}
                        edge="end"
                        sx={{ color: "#1C7BDF" }}
                      >
                        {showPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Stack>

          <Stack>
            <FormLabel
              htmlFor="password1"
              sx={{
                fontWeight: "bold",
                fontSize: "12px",
                color: "#222222",
                lineSpacing: 14,
                characterSpacing: 0,
              }}
            >
              Confirm Password
              <Typography
                component="span"
                sx={{
                  fontWeight: "Bold",
                  color: "#FF0000",
                  fontSize: "12px",
                  lineSpacing: 14,
                  characterSpacing: 0,
                }}
              >
                *
              </Typography>
            </FormLabel>
            <TextField
              id="password1"
              type={showPassword1 ? "text" : "password"}
              name="password1"
              sx={{
                width: 368,
                height: 48,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={togglePassword1}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                        edge="end"
                        sx={{ color: "#1C7BDF" }}
                      >
                        {showPassword1 ? (<VisibilityIcon />) : (<VisibilityOffIcon />)}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              value={formik.values.password1}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password1 && Boolean(formik.errors.password1)}
              helperText={formik.touched.password1 && formik.errors.password1}
            />
          </Stack>

          <Stack>
          <FormControlLabel
            label="Accept Terms & Conditions"
            control={
            <Checkbox
              name="accept"
              checked={formik.values.accept}
              onChange={(event) => {
                formik.setFieldValue("accept", event.target.checked); 
              }}
              inputProps={{ 'aria-label': 'Accept Terms & Conditions' }}
              icon={<PanoramaFishEyeIcon sx={{color:"#27C69E"}}/>}
              checkedIcon={<CheckCircleIcon sx={{color:"#27C69E"}} />} 
            />}
            sx={{
              fontWeight: "regular",
              fontSize: "17px",
              color: "#222222"
            }}
          />
          {formik.touched.accept && formik.errors.accept && (
          <Typography sx={{ color: "#d32f2f", fontSize: "12px", marginLeft:"17px"}}>
            {formik.errors.accept}
          </Typography>
        )}
        </Stack>

          <Button
            type="submit"
            variant="contained"
            sx={{
              width: 368,
              height: 48,
              background: "#1C7BDF",
              color: "#fff",
              borderRadius: "24px",
              textTransform: "none",
            }}
          >
            Sign Up
          </Button>
        </Stack>
      </form>
    </Box>
  );
}

export default SignUp;
