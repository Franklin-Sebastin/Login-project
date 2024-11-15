import React from "react";
import { Box,Typography, Stack, FormLabel,TextField,Button} from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik"; 

const validationSchema=Yup.object({
    email:Yup
        .string()
        .email("Enter a valid email")
        .required("Email is required"),
});

const ForgotPassword = () => {
    const formik=useFormik({
        initialValues:{
            email:"",
        },
        validationSchema:validationSchema,
    });

    return (
        <Box
            sx={{
                width: "496px",
                height: "305px",
                margin: "100px auto",
                fontFamily: " roboto",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.5)",
                backgroundColor: "#FFFFFF",
                borderRadius: 4,
            }}
        >
            <Typography
                variant="h4"
                sx={{
                    textAlign: "center",
                    fontStyle: "normal",
                    fontWeight: "bold",
                    fontSize: "32px",
                    lineHeight: "43px",
                    letterSpacing: "0",
                    color: "#222222",
                    padding: 4,
                }}
            >
                Reset Your Password
            </Typography>

            <form onSubmit={formik.handleSubmit}>
            <Stack spacing={3} sx={{ paddingLeft: 8 }}>
                <Stack >
                    <FormLabel
                        htmlFor="email"
                        sx={{ color: "#222222", fontWeight: "bold", fontSize: "12px",characterSpacing:0,lineSpacing:14 }}
                    >
                        Company Email
                        <Typography
                            component="span"
                            sx={{ fontWeight: "Bold", color:"#FF0000",fontSize:"12px",characterSpacing:0,lineSpacing:14 }}
                        > *
                        </Typography>
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
                    <Button type="submit"
                        variant="contained"
                        sx={{ borderRadius: 6, width: "368px", height: "48px", marginTop: 2, textTransform: "none", fontWeight: "bold", fontSize: "15px" }}
                    >
                        Send Password Reset Link
                    </Button>
                </Stack>
            </Stack>
            </form>
        </Box>
    );
};

export default ForgotPassword;
