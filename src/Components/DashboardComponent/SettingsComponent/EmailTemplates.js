import React, { useState } from "react";
import {Box,Typography,Stack,FormLabel,  TextField,Button,Tab,} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useFormik } from "formik";
import * as yup from "yup";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";

const validationSchema = yup.object({
  templateName: yup.string().required("Template name is required"),
  emailSubject: yup.string().required("Email Subject is required"),
  emailBody: yup.string().required("Email Body is required"),
});

const EmailTemplates = () => {
  const [value, setValue] = useState("0");
  const [tableList, setTableList] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    const selectedTemplate = tableList.find((item) => item.id === newValue);
    if (selectedTemplate) {
      formik.setValues({
        templateName: selectedTemplate.templateName,
        emailSubject: selectedTemplate.emailSubject,
        emailBody: selectedTemplate.emailBody,
      });
      formik.setFieldValue("templateName", "");
    }
  };
  const handleAddTemplateField = () => {
    const newTemplateName = formik.values.templateName;
    if (newTemplateName) {
      let defaultSubject = "";
      let defaultBody = "";

      if (newTemplateName === "Call for Offer") {
        defaultSubject = "Offer Call";
        defaultBody =
          "Dear [Candidate_name], We are delighted to extend this offer of employment for the position of [job_title]";
      } else if (newTemplateName === "Call for First Round Interview") {
        defaultSubject = "Interview Call";
        defaultBody =
          "Dear [Candidate_name], This is a call for the first round interview email for the position of [job_title]";
      } else {
        defaultSubject = "Default subject";
        defaultBody = "Default";
      }

      const newTemplate = {
        id: String(tableList.length),
        templateName: newTemplateName,
        emailSubject: defaultSubject,
        emailBody: defaultBody,
      };
      setTableList([...tableList, newTemplate]);
      formik.setFieldValue("templateName", "");
      setValue(newTemplate.id);
    }
  };

  const formik = useFormik({
    initialValues: {
      templateName: "",
      emailSubject: "",
      emailBody: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if(values){
        
      localStorage.setItem("Email Templates:",JSON.stringify(values));
    }
    },
  });

  const tabStyle = {
    width: "329px",
    height: "42px",
    backgroundColor: "#F7F7F7",
    color: "#222222",
    borderRadius: "12px",
    margin: "5px",
    textTransform: "none",
    fontWeight: "bold",
    "&.Mui-selected": { backgroundColor: "#27C69E", color: "#F7F7F7" },
  };

  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
      <Stack direction="row" spacing={90} sx={{marginBottom:"15px"}}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            fontSize: "29px",
            fontFamily: "robotto",
            color: "#222222",
            marginBottom: "20px",
          }}
        >
          Email Templates
        </Typography>

        <Button
          type="submit"
          variant="contained"
          sx={{
            borderRadius: "24px",
            width: "103px",
            backgroundColor: "#1C7BDF",
            boxShadow: "0px 3px 6px #00000029",
            height: "48px",
            textTransform: "none",
            fontWeight: "normal-bold",
            fontSize: "17px",
            marginTop: "15px",
          }}
        >
          <SaveIcon sx={{ marginRight: "8px" }} />
          Save
        </Button>
      </Stack>

      
        <Stack direction="column" spacing={4}>
          <Stack direction="row" spacing={1}>
            <Stack sx={{ component: "span", position: "relative" }}>
              <FormLabel
                htmlFor="templateName"
                sx={{
                  fontWeight: "bold",
                  fontSize: "12px",
                  color: "#222222",
                }}
              >
                Template Name
                <Typography
                  component="span"
                  sx={{
                    fontWeight: "bold",
                    color: "#FF0000",
                    fontSize: "12px",
                  }}
                >
                  *
                </Typography>
              </FormLabel>

              <TextField
                id="templateName"
                name="templateName"
                placeholder="Enter template name"
                sx={{
                  width: 279,
                  height: 48,
                  opacity: 1,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                }}
                value={formik.values.templateName}
                onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
                // error={formik.touched.templateName && Boolean(formik.errors.templateName)}
                //   helperText={formik.touched.templateName && formik.errors.templateName}
              />
            </Stack>
            <Stack>
              <Button
                variant="contained"
                onClick={handleAddTemplateField}
                sx={{
                  borderRadius: "50%",
                  width: "31px",
                  height: "31px",
                  background:
                    "transparent linear-gradient(180deg, #27C69E 0%, #1C7BDF 100%)",
                  minWidth: "unset",
                  fontWeight: "bold",
                  fontSize: "20px",
                  marginTop: "25px",
                }}
              >
                +
              </Button>
            </Stack>
          </Stack>

          <Stack direction="row">
            <TabContext value={value}>
              <Box>
                <TabList
                  orientation="vertical"
                  onChange={handleChange}
                  sx={{ ".MuiTabs-indicator": { display: "none" } }}
                >
                  {tableList.map((tableItem) => (
                    // <Box>
                    <Tab
                      key={tableItem.id}
                      label={tableItem.templateName}
                      value={tableItem.id}
                      sx={tabStyle}
                    />
                    //  <DeleteIcon/>
                    //  </Box>
                  ))}
                </TabList>
              </Box>

              {tableList.map((tableItem) => (
                <TabPanel
                  key={tableItem.id}
                  value={tableItem.id}
                  sx={{ position: "absolute", top: "232px", right: "55px" }}
                >
                  <Stack spacing={4}>
                    <Stack>
                      <FormLabel
                        htmlFor="emailSubject"
                        sx={{
                          fontWeight: "bold",
                          fontSize: "12px",
                          color: "#222222",
                        }}
                      >
                        Email Subject
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
                        id="emailSubject"
                        type="emailSubject"
                        name="emailSubject"
                        placeholder="Enter subject"
                        sx={{
                          width: 720,
                          height: 48,
                          opacity: 1,
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "8px",
                          },
                        }}
                        value={formik.values.emailSubject}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={ formik.touched.emailSubject && Boolean(formik.errors.emailSubject)}
                        helperText={formik.touched.emailSubject && formik.errors.emailSubject}
                      />
                    </Stack>

                    <Stack>
                      <FormLabel
                        htmlFor="emailBody"
                        sx={{
                          fontWeight: "bold",
                          fontSize: "12px",
                          color: "#222222",
                        }}
                      >
                        Email Body
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
                        id="emailBody"
                        type="emailBody"
                        name="emailBody"
                        multiline
                        rows={25}
                        sx={{
                          width: 720,
                          height: 48,
                          opacity: 1,
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "8px",
                          },
                        }}
                        value={formik.values.emailBody}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.emailBody && Boolean(formik.errors.emailBody)}
                        helperText={formik.touched.emailBody && formik.errors.emailBody}
                      />
                    </Stack>
                  </Stack>
                </TabPanel>
              ))}
            </TabContext>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
};

export default EmailTemplates;
