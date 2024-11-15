import React,{useState} from 'react'
import { Typography,Box,TextField,Button, IconButton,Stack,FormLabel,InputAdornment} from "@mui/material";
import * as yup from 'yup';
import {useFormik} from "formik";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const validationSchema = yup.object({
    password:yup
        .string()
        .required("Password is required"),
    password1: yup
      .string()
      .min(6, "atleast 6 characters")
      .matches(/[a-zA-Z]/, "Password must conatain atleast one letter")
      .matches(/[0-9]/, "Password must contain atleast one digit")
      .required("Password is required"),
    password2: yup
      .string()
      .oneOf([yup.ref("password1"), null], "Mismatch password")
      .required("Confirm password is required"),
  });

const ChangePassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    const togglePassword = () => {
        setShowPassword((prev) => !prev);
      };
    const togglePassword1 = () => {
        setShowPassword1((prev) => !prev);
      };
    const togglePassword2 = () => {
        setShowPassword2((prev) => !prev);
      };

      const formik = useFormik({
        initialValues: {
          password: "",
          password1: "",
          password2: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values,{resetForm}) => {
          if(values)
          {
          localStorage.setItem("Password ", JSON.stringify(values));
          alert("Password Updated successfully!");
          resetForm();
          }  
      },
      });


  return (
    <Box>
        <Typography variant='h5' sx={{ fontWeight: "bold", fontSize: "24px", fontFamily: "robotto", color: "#222222",marginLeft:"60px",marginBottom:"20px" }}> Change Password</Typography>

    <form onSubmit={formik.handleSubmit}>
        <Stack spacing={4} sx={{ paddingLeft: 8 }}>
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
              Current Password
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
                        // onMouseDown={handleMouseDownPassword}
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
              New Password
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
                        // onMouseDown={handleMouseDownPassword}
                        // onMouseUp={handleMouseUpPassword}
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
            <FormLabel
              htmlFor="password2"
              sx={{
                fontWeight: "bold",
                fontSize: "12px",
                color: "#222222",
                lineSpacing: 14,
                characterSpacing: 0,
              }}
            >
             Confirm New Password
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
              id="password2"
              type={showPassword2 ? "text" : "password"}
              name="password2"
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
                        onClick={togglePassword2}
                        // onMouseDown={handleMouseDownPassword}
                        // onMouseUp={handleMouseUpPassword}
                        edge="end"
                        sx={{ color: "#1C7BDF" }}
                      >
                        {showPassword2 ? (<VisibilityIcon />) : (<VisibilityOffIcon />)}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              value={formik.values.password2}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password2 && Boolean(formik.errors.password2)}
              helperText={formik.touched.password2 && formik.errors.password2}
            />
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
           Update Password
          </Button>
          </Stack>
          </form>
    </Box>
  )
}

export default ChangePassword
