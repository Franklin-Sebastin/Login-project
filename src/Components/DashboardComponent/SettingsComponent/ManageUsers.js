import { Box,Typography,Stack,FormLabel,TextField,Button,InputBase,styled,IconButton} from "@mui/material";
import { TableContainer,Table,TableHead,TableBody,TableRow,TableCell,Paper,} from "@mui/material";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import EmailIcon from "@mui/icons-material/Email";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const validationSchema = yup.object({
  fname: yup.string().required("Enter First name"),
  lname: yup.string().required("Enter Last name"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
});

const Search = styled("div")({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  backgroundColor: "#F7F7F7 ",
  borderRadius: "16px",
  width: "100%",
  height: "48px",
  margin: "20px 0",
});

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

const ManageUsers = () => {
  const [manageData, setManageData] = useState(tableData);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder,setSortOrder]=useState("asc");

  const formik = useFormik({
    initialValues: {
      fname: "",
      lname: "",
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const newUser = {
        id: manageData.length + 1,
        first_name: values.fname,
        last_name: values.lname,
        email: values.email,
        invited: "Just now",
        status: "Pending",
        last_active: "N/A",
        joined: "N/A",
      };
      setManageData([...manageData, newUser]);
      formik.resetForm();
    },
  });

  const filterData = manageData.filter((row) => {
    const fullName = `${row.first_name} ${row.last_name}`.toLowerCase();
    return (
      fullName.includes(searchQuery.toLowerCase()) ||
      row.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleDelete=(id)=>{
    setManageData(manageData.filter((row)=>row.id!==id));
  };

  const handleResendInvite=(email)=>{
    alert("Resend Invite Successfully");
    // formik.setFieldValue('email',email);
  }
  const handleSort=()=>{
    const sortedData=[...manageData].sort((a,b)=>{
      if (sortOrder==="asc"){
        return a.first_name.localeCompare(b.first_name);
      }
      else{
        return b.first_name.localeCompare(a.first_name);
      }
    });
    setManageData(sortedData);
    setSortOrder(sortOrder==="asc"?"des" :"asc");
  }

  return (
    <Box>
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          fontSize: "24px",
          fontFamily: "robotto",
          color: "#222222",
          marginBottom: "20px",
        }}
      >
        Manage Users
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <Stack direction="row" spacing={1}>
          <Stack>
            <FormLabel
              htmlFor="fname"
              sx={{
                fontWeight: "bold",
                fontSize: "12px",
                color: "#222222",
              }}
            >First name
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
              id="fname"
              name="fname"
              sx={{
                width: 179,
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
            <FormLabel
              htmlFor="lname"
              sx={{
                fontWeight: "bold",
                fontSize: "12px",
                color: "#222222",
              }}
            >
              Last name
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
              id="lname"
              name="lname"
              sx={{
                width: 179,
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

          <Stack>
            <FormLabel
              htmlFor="email"
              sx={{ color: "#222222", fontWeight: "bold", fontSize: "12px" }}
            >
              Company Email
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
            <Button
              type="submit"
              variant="contained"
              sx={{
                borderRadius: "24px",
                width: "151px",
                opacity: 1,
                backgroundColor: "#1C7BDF",
                height: "48px",
                textTransform: "none",
                fontWeight: "normal-bold",
                fontSize: "17px",
                marginTop: "15px",
              }}
            >
              <EmailIcon sx={{ width: 16, height: 16, marginRight: "10px" }} />{" "}
              Send Invite
            </Button>
          </Stack>
        </Stack>
      </form>

      <Search>
        <SearchIcon
          sx={{
            width: "20px",
            height: "20px",
            color: "#000000",
            opacity: 0.3,
            paddingX: "10px",
          }}
        />
        <InputBase
          placeholder="Search by name or email"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
      </Search>

      <TableContainer component={Paper} sx={{ border: "1px solid #EEEEEE" ,borderRadius:"12px",maxHeight:"600px",overflow:"auto",
                                    "&::-webkit-scrollbar": {
                                      display: "none",
                                    },
      }}>
        <Table aria-label="simple-table" >
          <TableHead>
            <TableRow sx={{width:"843px"}}>
              <TableCell sx={headerCellStyle}>Name 
                <IconButton onClick={handleSort}>
                      {sortOrder==="asc" ? <KeyboardArrowDownIcon/> : <KeyboardArrowUpIcon/>}
                  </IconButton> 
              </TableCell>
              <TableCell sx={headerCellStyle}>Email
              <IconButton onClick={handleSort}>
                      {sortOrder==="asc" ? <KeyboardArrowDownIcon/> : <KeyboardArrowUpIcon/>}
                  </IconButton> 
              </TableCell>
              <TableCell sx={headerCellStyle}>Invited
                  <IconButton onClick={handleSort}>
                      {sortOrder==="des" ? <KeyboardArrowDownIcon/> : <KeyboardArrowUpIcon/>}
                  </IconButton> 
              </TableCell>
              <TableCell sx={headerCellStyle}>Status
              <IconButton onClick={handleSort}>
                      {sortOrder==="asc" ? <KeyboardArrowDownIcon/> : <KeyboardArrowUpIcon/>}
                  </IconButton> 
              </TableCell>
              <TableCell sx={headerCellStyle}>Last Active
                <IconButton onClick={handleSort}>
                      {sortOrder==="des" ? <KeyboardArrowDownIcon/> : <KeyboardArrowUpIcon/>}
                  </IconButton> 
              </TableCell>
              <TableCell sx={headerCellStyle}>Joined
              <IconButton onClick={handleSort}>
                      {sortOrder==="des" ? <KeyboardArrowDownIcon/> : <KeyboardArrowUpIcon/>}
                  </IconButton> 
              </TableCell>
              <TableCell sx={headerCellStyle}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{height:"100px"}}>
            {filterData.map((row) => (
              <TableRow
                key={row.id}
                // sx={{ "&:last-child td,&:last-child th": { border: 0 } }}
              >
                <TableCell
                  sx={{ bodyCellStyle }}
                >{`${row.first_name} ${row.last_name}`}</TableCell>
                <TableCell sx={{ bodyCellStyle }}>{row.email}</TableCell>
                <TableCell sx={{ bodyCellStyle }}>{row.invited}</TableCell>
                <TableCell
                  sx={{
                    ...bodyCellStyle,
                    color: row.status === "Accepted" ? "#00D400" : "#FF0000",
                  }}
                >
                  {row.status}
                </TableCell>
                <TableCell sx={{ bodyCellStyle }}>{row.last_active}</TableCell>
                <TableCell sx={{ bodyCellStyle }}>{row.joined}</TableCell>
                <TableCell sx={{ bodyCellStyle }}>
                  {row.status === "Accepted" ? (<Button variant="contained"
                      sx={{
                        borderRadius: "24px",
                        width: "144px",
                        backgroundColor: "#EEEEEE",
                        color: "black",
                        height: "36px",
                        textTransform: "none",
                        fontWeight: "bold",
                      }} onClick={()=>handleDelete(row.id)}
                    >
                      <DeleteIcon sx={{ marginRight: "5px" }} />
                      Delete User
                    </Button>
                  ) : ( <Button variant="contained"
                      sx={{
                        borderRadius: "24px",
                        width: "160px",
                        opacity: 1,
                        backgroundColor: "#1C7BDF",
                        height: "36px",
                        textTransform: "none",
                        fontWeight: "bold",
                      }} 
                      onClick={()=>handleResendInvite(row.email)}
                    >
                      <EmailIcon
                        sx={{ width: 16, height: 16, marginRight: "10px" }}
                      />
                      Resend Invite
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ManageUsers;

const tableData = [
  {
    id: 1,
    first_name: "Obie",
    last_name: "Phebee",
    email: "ophebee0@kickstarter.com",
    invited: "19 hours ago",
    status: "Accepted",
    last_active: "3 days ago",
    joined: "October 26,2021",
  },
  {
    id: 2,
    first_name: "Shea",
    last_name: "Folks",
    email: "sfolks1@simplemachines.org",
    invited: "a month ago",
    status: "Pending",
    last_active: "16 days ago",
  },
  {
    id: 3,
    first_name: "Vita",
    last_name: "Forrestill",
    email: "vforrestill2@chronoengine.com",
    invited: "a month ago",
    status: "Accepted",
    last_active: "19 days ago",
    joined: "November 22,2021",
  },
  {
    id: 4,
    first_name: "Rurik",
    last_name: "Gillson",
    email: "rgillson3@nps.gov",
    invited: "a month ago",
    status: "Pending",
    last_active: "16 days ago",
  },
  {
    id: 5,
    first_name: "Flori",
    last_name: "Torpie",
    email: "ftorpie4@pinterest.com",
    invited: "a month ago",
    status: "Pending",
    last_active: "16 days ago",
  },
  {
    id: 6,
    first_name: "Claus",
    last_name: "McGiffin",
    email: "cmcgiffin5@yahoo.co.jp",
    invited: "a month ago",
    status: "Accepted",
    last_active: "19 days ago",
    joined: "November 22,2021",
  },
  {
    id: 7,
    first_name: "Maritsa",
    last_name: "Greasley",
    email: "mgreasley6@chronoengine.com",
    invited: "a month ago",
    status: "Accepted",
    last_active: "19 days ago",
    joined: "November 22,2021",
  },
  {
    id: 8,
    first_name: "Bobbette",
    last_name: "Behning",
    email: "bbehning7@illinois.edu",
    invited: "a month ago",
    status: "Pending",
    last_active: "16 days ago",
  },
  {
    id: 9,
    first_name: "Mureil",
    last_name: "Jameson",
    email: "mjameson8@illinois.edu",
    invited: "a month ago",
    status: "Pending",
    last_active: "16 days ago",
  },
  {
    id: 10,
    first_name: "Judy",
    last_name: "Halliwell",
    email: "jhalliwell9@china.com.cn",
    invited: "a month ago",
    status: "Accepted",
    last_active: "19 days ago",
    joined: "November 22,2021",
  },
];
