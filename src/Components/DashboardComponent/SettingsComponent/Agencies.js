import React,{useRef, useState} from 'react'
import { Box,Typography,Stack,FormLabel,TextField,Button,IconButton,InputAdornment,MenuItem,Select,InputLabel} from "@mui/material";
import { TableContainer,Table,TableHead,TableBody,TableRow,TableCell,Paper,} from "@mui/material";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useFormik } from "formik";
import * as yup from "yup";

const headerCellStyle = {
  fontSize: "15px",
  color: "#222222",
  fontWeight: "bold",
};
const bodyCellStyle = {
  fontSize: "15px",
  color: "#222222",
  fontWeight: "normal",
};

const validationSchema = yup.object({
    aname: yup.string().required("Agency name is required"),
    poc: yup.string().required("Point of contact is required"),
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
  });

const Agencies = () => {
    const fileInputRef=useRef(null);
    const [selectedFile,setSelectedFile]=useState(null);
    const [salaryField,setSalaryField]=useState([]);
    const [agencyData,setAgencyData]=useState(tableData);
    const [sortOrder,setSortOrder]=useState("asc");
  

    const handleFileSelect=()=>{
        fileInputRef.current.click();
    }
    const handleFileChange=(event)=>{
        const file=event.target.files[0];
        const maxFileSize=1.4*1024*1024;
        if(file){
            if(file.size>maxFileSize){
                alert("File size exceeds the limit of 1.4 MB. Please select a smaller file");
                event.target.value("");
            }
            else{
                setSelectedFile(file.name);
            }
        }
    }
    const handleAddSalaryField=()=>{
      if (salaryField.length < 3) {
        setSalaryField([...salaryField,{
            minSalary:"",
            maxSalary:"",
            percentage:"",
            contractDate:"",
            minSalary:"",
            maxSalary:"",
            percentage:"",
        }]);
      }
      else{
        alert("You can only add upto 3 fields.");
      }
    }
    const handleSalaryFieldChange = (index, field, value) => {
        const updatedFields = salaryField.map((item, i) =>{
          if( i === index){
              return { ...item, [field]: value };
              }
                return item
            });
        setSalaryField(updatedFields);
        // console.log(updatedFields);
      };

      const handleMaxBlur=(index)=>{
        const { minSalary, maxSalary } = salaryField[index];
    
        if (minSalary >= maxSalary) {
          alert("Min Salary should be less than Max Salary.");
          return false;
      }
   
        if (maxSalary <= minSalary) {
            alert("Max Salary should be greater than Min Salary.");
            return false;
        }
      }

    const handleDeleteSalaryField=(index)=>{
        const updatedFields = salaryField.filter((_, i) => i !== index);
        setSalaryField(updatedFields);
    }

    const handleDeleteButton=(index)=>{
      const updatedFields=agencyData.filter((row,i)=>i!==index);
      setAgencyData(updatedFields);

    }

    const handleSort=()=>{
      const sortedData=[...agencyData].sort((a,b)=>{
        if(sortOrder==="asc"){
          return a.agency_name.localeCompare(b.agency_name);
        }
        else{
          return b.agency_name.localeCompare(a.agency_name);
        }

      });
      setAgencyData(sortedData);
      setSortOrder(sortOrder === "asc" ? "desc" : "asc"); 
    }

    const formik = useFormik({
        initialValues: {
          aname: "",
          poc: "",
          email: "",
          phnum:"",
          uploadContract:"",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
          const salaryData = salaryField.map((field) => ({
            minSalary: field.minSalary,
            maxSalary: field.maxSalary,
            percentage: field.percentage,
          }));

          const newUser = {  
            aname: values.aname,
            poc: values.poc,
            phnum: values.phnum,
            uploadContract:values.uploadContract,
            salaryData,
           
          };
          setAgencyData([...agencyData, newUser]);
          localStorage.setItem("Agency Data:",JSON.stringify(newUser));

          formik.resetForm();
         
        },
      });
  return (
    <Box sx={{display:"flex",flexDirection:"row",justifyContent:"space-between",gap:3}}>
    <Box>
         <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          fontSize: "32px",
          fontFamily: "robotto",
          color: "#222222",
          marginBottom: "20px",
        }}
      >
        Agencies
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <Stack direction="column" spacing={4}>
          <Stack>
            <FormLabel
              htmlFor="aname"
              sx={{
                fontWeight: "bold",
                fontSize: "12px",
                color: "#222222",
              }}
            >Agency Name
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
              id="aname"
              name="aname"
              sx={{
                width: 373,
                height: 48,
                opacity: 1,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
              value={formik.values.aname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.aname && Boolean(formik.errors.aname)}
              helperText={formik.touched.aname && formik.errors.aname}
            />
          </Stack>

          <Stack>
            <FormLabel
              htmlFor="poc"
              sx={{
                fontWeight: "bold",
                fontSize: "12px",
                color: "#222222",
              }}
            >
             Point of Contact
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
              id="poc"
              name="poc"
              sx={{
                width: 373,
                height: 48,
                opacity: 1,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
              value={formik.values.poc}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.poc && Boolean(formik.errors.poc)}
              helperText={formik.touched.poc && formik.errors.poc}
            />
          </Stack>

          <Stack>
            <FormLabel
              htmlFor="email"
              sx={{ color: "#222222", fontWeight: "bold", fontSize: "12px" }}
            >
             Official Email Address
              <Typography
                component="span"
                sx={{ fontWeight: "Bold", color: "#FF0000", fontSize: "12px" }}
              > *
              </Typography>
            </FormLabel>
            <TextField
              id="email"
              name="email"
              sx={{
                width: "373px",
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
              htmlFor="phnum"
              sx={{ color: "#222222", fontWeight: "bold", fontSize: "12px" }}
            >
            Phone number
            </FormLabel>
            <TextField
              id="phnum"
              name="phnum"
              placeholder='Enter Your Phone Number'
              sx={{
                width: "373px",
                height: "48px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
              value={formik.values.phnum}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Stack>

          <Stack direction="row" spacing={1}>
          <Stack>
            <FormLabel
              htmlFor="uploadContract"
              sx={{ color: "#222222", fontWeight: "bold", fontSize: "12px" }}
            >
            Upload Current Contract
            </FormLabel>

            <TextField
              id="uploadContract"
              name="uploadContract" 
              placeholder="Contract.pdf (1.4 MB)"
              sx={{
                width: "179px",
                height: "48px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
                "& .MuiInputBase-input::placeholder": {
                  fontSize: "11px", 
                },
              }}
              InputProps={{
                startAdornment:(
                    <InputAdornment position="start">
                        <IconButton>
                            <AttachFileIcon  sx={{color:"gray",width:"17px",height:"17px" }} onClick={handleFileSelect}/>
                        </IconButton>
                        <input type="file" 
                             ref={fileInputRef}
                            style={{display:"none"}}
                                    onChange={handleFileChange}
                                    name="fileUpload" accept=".pdf"/>
                                     {selectedFile && (
                    <Typography sx={{fontSize:"12px", color:"green"}}>
                     {selectedFile}
                    </Typography>
                    )}

                        </InputAdornment>
                     ),}}
              value={formik.values.uploadContract}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
           
          </Stack>

          <Stack>
            <InputLabel
              id="contractDate"
              sx={{ color: "#222222", fontWeight: "bold", fontSize: "12px" }}
            >
            Contract Ending Date
            </InputLabel>
            <Select
                            labelId="contractDate"
                            label="date"
                            name="contractDate"
                            sx={{width:"184px",height:"55px",borderRadius:"8px"}}
                            value={formik.values.contractDate}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        >
                            <MenuItem value={1}>November 1,2023</MenuItem>
                            <MenuItem value={2}>December 21,2023</MenuItem>
                            <MenuItem value={3}>October 19,2023</MenuItem>
            </Select>
          </Stack>
          </Stack>
        
        <Stack spacing={2}>
        <FormLabel
              htmlFor="commission"
              sx={{ color: "#222222", fontWeight: "bold", fontSize: "17px" }}
            >
          Commission Slabs
            </FormLabel>

            {salaryField.map((field,index)=>(
                <Stack direction="row" spacing={1}> 
                    <Stack>
                        <FormLabel
                        htmlFor="minSalary"
                        sx={{
                            fontWeight: "bold",
                            fontSize: "12px",
                            color: "#222222",
                        }}
                        >
                        Min Salary
                        </FormLabel>

                        <TextField
                        id="minSalary"
                        name="minSalary"
                        sx={{
                            width: "118px",
                            height: "48px",
                            opacity: 1,
                            "& .MuiOutlinedInput-root": {
                            borderRadius: "8px",
                            },
                        }}
                        value={field.minSalary}
                        onChange={(e)=>{handleSalaryFieldChange(index,"minSalary",e.target.value)}}
                        />
                 </Stack>

                 <Stack>
                        <FormLabel
                        htmlFor="maxSalary"
                        sx={{
                            fontWeight: "bold",
                            fontSize: "12px",
                            color: "#222222",
                        }}
                        >
                        Max Salary
                        </FormLabel>

                        <TextField
                        id="maxSalary"
                        name="maxSalary"
                        onBlur={()=>handleMaxBlur(index)}
                        sx={{
                            width: "118px",
                            height: "48px",
                            opacity: 1,
                            "& .MuiOutlinedInput-root": {
                            borderRadius: "8px",
                            },
                        }}
                        value={field.maxSalary}
                        onChange={(e)=>{handleSalaryFieldChange(index,"maxSalary",e.target.value)}}
                        />
                 </Stack>

                 <Stack>
                        <FormLabel
                        htmlFor="percentage"
                        sx={{
                            fontWeight: "bold",
                            fontSize: "12px",
                            color: "#222222",
                        }}
                        >
                        Percentage
                        </FormLabel>

                        <TextField
                        id="percentage"
                        name="percentage"
                        sx={{
                            width: "72px",
                            height: "48px",
                            opacity: 1,
                            "& .MuiOutlinedInput-root": {
                            borderRadius: "8px",
                            },
                        }}
                        value={field.percentage}
                        onChange={(e)=>{handleSalaryFieldChange(index,"percentage",e.target.value)}}
                        />
                 </Stack>
                 
                 <IconButton sx={{color:"#FF0000"}} onClick={()=>handleDeleteSalaryField(index)}>
                    <DeleteOutlineIcon/>
                 </IconButton>

                </Stack>
             ))} 

            <Stack sx={{display:"flex",flexDirection:"row",gap:2,alignItems:"center"}}>
                <Button
                variant="contained"
                onClick={handleAddSalaryField}
                sx={{
                    borderRadius: "50%",
                    width: "31px",
                    height: "31px",
                    background: "transparent linear-gradient(180deg, #27C69E 0%, #1C7BDF 100%)",
                    minWidth: "unset",
                    fontWeight:"bold",
                    fontSize:"17px",
                }}
                >
                +
                </Button>
                <Typography sx={{fontSize:"15px",color: "#1C7BDF",fontWeight:"bold"}}>
                    Add Commission Slab
                </Typography>

            </Stack>

        </Stack>

          <Button
              type="submit"
              variant="contained"
              sx={{
                borderRadius: "24px",
                width: "368px",
                backgroundColor: "#1C7BDF",
                height: "48px",
                textTransform: "none",
                fontWeight: "normal-bold",
                fontSize: "17px",
                marginTop: "15px",
              }}
            >
              Save
            </Button>
        </Stack>
        </form>
    </Box>
    <Box>
      <TableContainer component={Paper} sx={{ border: "1px solid #EEEEEE" ,borderRadius:"12px",width:"700px",marginTop:"20px",maxHeight:"600px",overflow:"auto",
                                              "&::-webkit-scrollbar": {
                                                          display: "none",
                                                        },}}>
        <Table aria-label="salary-table">
          <TableHead>
            <TableRow>
              <TableCell sx={headerCellStyle}>Agency Name
                <IconButton onClick={handleSort}>
                    {sortOrder==="asc" ? <KeyboardArrowDownIcon/> : <KeyboardArrowUpIcon/>}
                    
                </IconButton> 
              </TableCell>
              <TableCell sx={headerCellStyle}>Point of Contact 
              <IconButton onClick={handleSort}>
                    {sortOrder==="asc" ? <KeyboardArrowDownIcon/> : <KeyboardArrowUpIcon/>}
                </IconButton> 
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody >
              {agencyData.map((row,index)=>(
                 <TableRow key={row.id} 
                 sx={{ "&:last-child td,&:last-child th": { border: 0 } }}>
                  <TableCell sx={bodyCellStyle}>{row.agency_name} </TableCell>
                  <TableCell sx={bodyCellStyle}>{row.point_of_contact}</TableCell>
                  <TableCell sx={bodyCellStyle}>
                      <Button sx={{color:"#000000", backgroundColor: "#EEEEEE",borderRadius:"24px",width:"179px",height:"36px",fontSize:"17px",fontWeight:"bold",textTransform:"none"}}
                              onClick={()=>handleDeleteButton(index)} ><DeleteIcon sx={{ marginRight: "5px",color:"#000000" }} />Remove Agency </Button>
                    </TableCell>
                  </TableRow>
              ))} 
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
    </Box>

  )
}

export default Agencies

const tableData=[
  {

    agency_name:"Frank Agency",
    point_of_contact:"Frank Jerome",
  },
  {
    agency_name:"Gnala Agency",
    point_of_contact:"Gnala Jerome",
  },
  {
    agency_name:"Jack Agency",
    point_of_contact:"John Doe",
  },
  {
    agency_name:"Nan Agency",
    point_of_contact:"Nan Doe",
  },
  {
    agency_name:"Giraffe Agency",
    point_of_contact:"Giraffe Doe",
  },
  {
    agency_name:"ABC Agency",
    point_of_contact:"John Doe",
  },
  {
    agency_name:"ABC Agency",
    point_of_contact:"John Doe",
  },
  {
    agency_name:"ABC Agency",
    point_of_contact:"John Doe",
  },
  {
    agency_name:"ABC Agency",
    point_of_contact:"John Doe",
  },
  {
    agency_name:"ABC Agency",
    point_of_contact:"John Doe",
  },
]
