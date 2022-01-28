import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import RememberMeSharpIcon from "@mui/icons-material/RememberMeSharp";
import TableRow from "@mui/material/TableRow";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditRoundedIcon from "@mui/icons-material/ModeEditRounded";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import * as yup from "yup";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Modal from "@mui/material/Modal";
import moment from "moment";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import darkScrollbar from "@mui/material/darkScrollbar";
import "./Table.css";
import { RowingSharp } from "@mui/icons-material";
import isValid from "date-fns/isValid";
import { yearsToMonths } from "date-fns";

function createData(name, location, date, units, type, points) {
  return { name, location, date, units, type, points };
}

// useEffect(() =>{
//     fetch(url)
//     .then((resp)=>{
//       if (resp.status >= 200 && resp.status <=299){
// return resp.json()
// const rows = [
//   {
//     name: "abdullah",
//     location: "pakistan",
//     date: "1-12-2021",
//     units: 15.9,
//     type: "running",
//     points: 5,
//   },
//   {
//     name: "Lana",
//     location: "USA",
//     date: "1-12-2020",
//     units: 5.9,
//     type: "running",
//     points: 1,
//   },
//   {
//     name: "Rodriguez",
//     location: "Mexico",
//     date: "1-12-2020",
//     units: 19,
//     type: "jumping",
//     points: 10,
//   },
//   {
//     name: "abc",
//     location: "Mexico",
//     date: "1-12-2020",
//     units: 19,
//     type: "jumping",
//     points: 10,
//   },
//   {
//     name: "cc",
//     location: "Mexico",
//     date: "1-12-2020",
//     units: 19,
//     type: "jumping",
//     points: 10,
//   },
// ];
// const editSubmit () => {

// }
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicTable() {
  const [open, setOpen] = useState(false);
  const [editopen, setEditOpen] = useState(false);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState(new moment().format("L"));
  const [units, setUnits] = useState("");
  const [points, setPoints] = useState("");
  const [userId, setUserId] = useState("");
  const [emp, setEmp] = useState([]);
  const [person, setPerson] = useState("");
  const [count, setCount] = useState(0);
  const [error, setError] = useState(null);
  const [newValue, setNewValue] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleEditOpen = () => {
    setEditOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setEditOpen(false);
    setName("");
    setType("");
    setLocation("");
    setPoints();
    setUnits("");
    setDate("");
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };
  const userSchema = yup.object().shape({
    name: yup.string().required(),
    Location: yup.string(),
    Date: yup.string(),
    units: yup.number(),
    Type: yup.string(),
    Points: yup.number().min(1, "Must be more than 1 characters"),
  });

  const handleSubmit = async () => {
    try {
      const body = {
        name,
        type,
        points,
        location,
        units,
        date,
      };
      const validation = await userSchema.isValid({
        name,
        type,
        points,
        location,
        units,
        date,
      });
      console.log(validation, "VALIDATION");
      if (!validation) {
        alert("you have entered the wrong value");

        console.log("sommething is wrong");
      } else {
        console.log(validation, "=========================abc");
        console.log(name, location, type, units, date, points);
        const response = await axios.post(
          `http://192.168.0.127:3005/api/user/abdullah`,
          body
        );

        console.log("Get value successful", response.data, isValid);
        handleClose();
        setName("");
        setType("");
        setLocation("");
        setUnits("");
        setDate("");
        setPoints("");
        getData();
        console.log(response.data);
      }
    } catch (errors) {
      console.error(errors);
    }
  };
  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(
        `http://192.168.0.127:3005/api/user/abdullah/${id}`
      );

      window.confirm("Are you sure you want to delete");
      getData();
    } catch (errors) {
      console.error(errors);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(
        `http://192.168.0.127:3005/api/user/abdullah`
      );

      console.log("form submit successfully", response.data);
      setEmp(response.data);
    } catch (errors) {
      console.error(errors);
    }
  };
  const getuserbyId = async (_id) => {
    try {
      const response = await axios.get(
        `http://192.168.0.127:3005/api/user/abdullah/${_id}`
      );

      console.log("Get user by id", response.data);
      setEditOpen(true);
      setUserId(response.data._id);
      setName(response.data.name);
      setLocation(response.data.location);
      setType(response.data.type);
      setUnits(response.data.units);
      setDate(response.data.date);
      setPoints(response.data.points);
    } catch (errors) {
      console.error(errors);
    }
  };
  const decrement = (index) => {
    var newObj = [...emp];
    var changePoint = newObj[index];
    if (changePoint.points <= 0) {
      return;
    } else {
      changePoint.points = parseFloat(changePoint.points - 1);

      var newPoint = [
        ...emp.slice(0, index),
        changePoint,
        ...emp.slice(index + 1, emp.length),
      ];
      setEmp(newPoint);
      console.log(newPoint);
    }
  };
  const increment = (index) => {
    var newObj = [...emp];
    var changePoint = newObj[index];
    changePoint.points = parseFloat(changePoint.points + 1);
    var newPoint = [
      ...emp.slice(0, index),
      changePoint,
      ...emp.slice(index + 1, emp.length),
    ];
    setEmp(newPoint);
    console.log(newPoint);
  };

  const Increment = (points) => {
    setTimeout(() => {
      // setValue(value + 1);
      setPoints(() => {
        return increment;
      });
    }, 2000);
  };
  const handleIncrement = (index) => {
    console.log(index, "--------------------Index Value");
  };

  const handleUpdateData = async () => {
    try {
      const response = await axios.put(
        `http://192.168.0.127:3005/api/user/abdullah/${userId}`,
        {
          name,
          points,
          type,
          location,
          units,
          date,
        }
      );

      console.log("Update Successfully", response);
      setEditOpen(false);
      getData();
    } catch (errors) {
      console.error("ERRORS!!!!", errors);
    }
  };

  const handleUpdateDataPoints = async (_id) => {
    try {
      const response = await axios.put(
        `http://192.168.18.139:3005/api/user/abdullah/${_id}`,
        {
          name,
          points,
          type,
          location,
          units,
          date,
        }
      );
      console.log(response.data);
    } catch (errors) {
      console.error("ERRORS!!!!", errors);
    }
  };

  function handlePlus() {
    if (count === null || count === "") {
      setCount(1);
    } else {
      setCount(count + 1);
      setError(null);
    }
  }
  function handleMinus() {
    if (count > 0) {
      setCount(count - 1);
      setError(null);
    } else {
      setError("Please Enter a Valid Number");
    }
  }
  function handleValueChange(e) {
    e.preventDefault();
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      const x = Number(e.target.value);
      setCount(x);
      setError("Added");
    } else {
      setError("Your input is not valid");
    }
  }
  // const handleIncrement = (count) => {
  //   const newCounter = { ...this.state.count, [id]: count[_id] + 1 };
  //   this.setState({ count: newCounter });
  // };

  return (
    <div>
      <div>
        <Stack direction="row" spacing={2}>
          <Avatar
            alt="Abdullah Iqbal"
            src="/static/images/avatar/1.jpg"
            sx={{ width: 70, height: 70 }}
          >
            <RememberMeSharpIcon color="success" />
          </Avatar>
          <h1 className="creator">Creator</h1>
        </Stack>
      </div>

      <div className="flex-container" flex-direction="row">
        <h1 className="heading">Leaderboard</h1>

        <Button
          variant="contained"
          className="button"
          size="small"
          // onChange={open}
          onClick={handleOpen}
        >
          Add player
        </Button>
      </div>
      <div>
        <h1>
          <h1></h1>
        </h1>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 800 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Location</StyledTableCell>
              <StyledTableCell align="right">Date</StyledTableCell>
              <StyledTableCell align="right">units</StyledTableCell>
              <StyledTableCell align="right">Type</StyledTableCell>
              <StyledTableCell align="center">Points</StyledTableCell>
              <StyledTableCell align="right">Edit/Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {emp.map((row, index) => (
              <StyledTableRow ledTableRow key={row._id}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>

                <StyledTableCell align="right">{row.location}</StyledTableCell>

                <StyledTableCell align="right">
                  {moment(row.date).format("L")}
                </StyledTableCell>
                <StyledTableCell align="right">{row.units}</StyledTableCell>
                <StyledTableCell align="right">{row.type}</StyledTableCell>

                <StyledTableCell align="right">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      onClick={() => {
                        handleUpdateDataPoints(row._id);
                        decrement(index);

                        console.log(points, index, row.points);
                      }}
                      size="small"
                      variant="contained"
                    >
                      -
                    </Button>
                    {row.points}
                    <Button
                      size="small"
                      onClick={() => {
                        increment(index);
                        console.log(row.points);
                      }}
                      variant="contained"
                    >
                      +
                    </Button>
                  </div>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <IconButton
                    onClick={() => {
                      getuserbyId(row._id);
                    }}
                  >
                    <ModeEditRoundedIcon></ModeEditRoundedIcon>
                  </IconButton>
                  <IconButton
                    startIcon={<DeleteIcon />}
                    aria-label="delete"
                    onClick={() => deleteUser(row._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  {/* <DeleteIcon onClick={deleteUser(row._id)} /> */}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {/* <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography> */}
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              <h1>Add Data</h1>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Name"
                value={name}
                variant="outlined"
                onChange={(e) => {
                  console.log(name);
                  setName(e.target.value);
                }}
              ></TextField>

              <TextField
                fullWidth
                id="outlined-basic"
                label="Location"
                value={location}
                variant="outlined"
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
              ></TextField>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Date"
                  value={date}
                  minDate={new Date("2017-01-01")}
                  onChange={(date) => {
                    setDate(date);
                  }}
                  renderInput={(params) => <TextField fullWidth {...params} />}
                />
              </LocalizationProvider>

              <TextField
                fullWidth
                id="outlined-basic"
                label="Units"
                variant="outlined"
                value={units}
                onChange={(e) => {
                  setUnits(e.target.value);
                }}
              ></TextField>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Type"
                variant="outlined"
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                }}
              ></TextField>

              <TextField
                fullWidth
                id="outlined-basic"
                label="Points"
                variant="outlined"
                value={points}
                onChange={(e) => {
                  setPoints(e.target.value);
                }}
              ></TextField>
              <Button onClick={handleSubmit}>Submit</Button>
            </div>
          </Box>
        </Modal>
      </div>

      <div>
        <Modal
          open={editopen}
          onClose={handleEditClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {/* <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography> */}
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              <h1>Edit data</h1>

              <TextField
                id="outlined-basic"
                label="Name"
                value={name}
                variant="filled"
                fullWidth
                onChange={(e) => {
                  console.log(name);
                  setName(e.target.value);
                }}
              ></TextField>

              <TextField
                id="outlined-basic"
                label="Location"
                value={location}
                variant="outlined"
                fullWidth
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
              ></TextField>

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Date"
                  value={date}
                  minDate={new Date("2017-01-01")}
                  onChange={(date) => {
                    setDate(date);
                  }}
                  renderInput={(params) => <TextField fullWidth {...params} />}
                />
              </LocalizationProvider>

              <TextField
                id="outlined-basic"
                label="Units"
                variant="outlined"
                value={units}
                fullWidth
                onChange={(e) => {
                  setUnits(e.target.value);
                }}
              ></TextField>
              <TextField
                id="outlined-basic"
                label="Type"
                variant="outlined"
                fullWidth
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                }}
              ></TextField>
              <TextField
                id="outlined-basic"
                label="Points"
                variant="outlined"
                fullWidth
                value={points}
                onChange={(e) => {
                  setPoints(e.target.value);
                }}
              ></TextField>
              <Button variant="contained" onClick={handleUpdateData}>
                Submit
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
      <div className="footer"></div>
    </div>
  );
}
