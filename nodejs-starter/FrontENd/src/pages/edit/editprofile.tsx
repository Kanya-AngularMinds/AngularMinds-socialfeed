import React, { useState, useEffect } from "react";

import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  Paper,
  Radio,
  RadioGroup,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import "./editprofile.scss";
import { LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { DatePicker } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import PhoneInput from "react-phone-input-international";
import "react-phone-input-international/lib/style.css";
import AddAPhotoRoundedIcon from "@mui/icons-material/AddAPhotoRounded";
import Drawer from "@mui/material/Drawer";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { patch } from "../../utils/http/httpMethods";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
toast.configure();

interface booleanProps {
  openEdit: boolean;
  setOpenEdit: any;
}

function Editprofile({ openEdit, setOpenEdit }: booleanProps) {
  const [nameErrorState, setNameErrorState] = useState({
    helperText: "",
    error: false,
  });

  const [emailErrorState, setEmailErrorState] = useState({
    helperText: "",
    error: false,
  });

  let userObj = JSON.parse(localStorage.getItem("currentUser") as any);

  const [anchorEl, setAnchorEl] = useState(null);
  const [name, setName] = useState(userObj ? userObj.name : "");
  const [email, setEmail] = useState(userObj ? userObj.email : "");
  const [dob, setDob] = useState(userObj ? userObj.dob : new Date());
  const [bio, setBio] = useState(userObj ? userObj.bio : "");
  const [gender, setGender] = useState(userObj ? userObj.gender : "");
  const [mobile, setMobile] = useState("");

  const [profilepic, setProfilepic] = useState({
    file: [],
    filepreview: [],
  } as any);

  // console.log(profilepic);
  const open = Boolean(anchorEl);

  const handleClick = (e: any) => {
    setAnchorEl(e.currentTarget);
  };

  const handleImg = (e: any) => {
    setProfilepic({ filepreview: URL.createObjectURL(e.target.files[0]) });
    const formData = new FormData();
    formData.append("profilePicture", e.target.files[0]);

    patch(
      `http://localhost:8080/users/profilePicture/${userObj._id}`,
      formData
    ).then((response) => {
      console.log(response);
      localStorage.setItem("currentUser", JSON.stringify(response));
      setAnchorEl(null);

      let msg = (
        <p style={{ fontSize: 15 }}>Profile picture updated successfully </p>
      );
      toast.success(msg, {
        position: toast.POSITION.TOP_RIGHT,
        icon: CheckCircleOutlineIcon,
        autoClose: 1000,
        hideProgressBar: true,
      });
    });
  };

  const handleName = (e: any) => {
    console.log(e.target.value);
    setName(e.target.value);
    if (e.target.value === "") {
      setNameErrorState({ helperText: "Name is required", error: true });
    } else {
      setNameErrorState({ helperText: "", error: false });
    }
  };

  const handleEmail = (e: any) => {
    setEmail(e.target.value);
    let regx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!regx.test(e.target.value)) {
      setEmailErrorState({
        helperText: "Please enter a valid email address",
        error: true,
      });
    } else {
      setEmailErrorState({ helperText: "", error: false });
    }
  };

  const handleEdit = () => {
    let editedObj = {
      name,
      email,
      bio,
      gender,
      dob,
      mobile,
    };
    console.log(editedObj);

    patch(`http://localhost:8080/users/${userObj._id}`, editedObj).then(
      (response) => {
        console.log(response);
        localStorage.setItem("currentUser", JSON.stringify(response));

        let msg = <p style={{ fontSize: 15 }}>Profile updated successfully </p>;
        toast.success(msg, {
          position: toast.POSITION.TOP_RIGHT,
          icon: CheckCircleOutlineIcon,
          autoClose: 1000,
          hideProgressBar: true,
        });
      }
    );
  };

  const removePhoto = () => {
    {
      delete userObj.profilePicture;
    }
    console.log(userObj);
    localStorage.setItem("currentUser", JSON.stringify(userObj));
    setAnchorEl(null);
  };

  return (
    <Modal open={openEdit} onClose={() => setOpenEdit(false)}>
      <Box className="addModal">
        <Card className="card">
          <CloseIcon
            style={{
              position: "relative",
              right: "-12rem",
              top: "-5px",
              color: "gray",
            }}
            onClick={() => setOpenEdit(false)}
          />
          <Avatar
            style={{
              height: "120px",
              width: "120px",
            }}
            onClick={handleClick}
          >
            <img src={userObj ? userObj.profilePicture : null} />
          </Avatar>
          <IconButton edge="end" sx={{ mt: "-1.5rem", ml: "2rem" }}>
            <AddAPhotoRoundedIcon
              sx={{
                color: "#1890FF",
                backgroundColor: "white",
                padding: "7px",
                borderRadius: "50%",
              }}
            />
          </IconButton>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="outlined-required"
                label="Name"
                value={name}
                fullWidth
                onChange={(e) => handleName(e)}
                helperText={nameErrorState.helperText}
                error={nameErrorState.error}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="outlined-required"
                label="email"
                fullWidth
                value={email}
                onChange={(e) => handleEmail(e)}
                helperText={emailErrorState.helperText}
                error={emailErrorState.error}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextareaAutosize
                aria-label="empty textarea"
                placeholder="Bio"
                minRows={6}
                value={bio}
                onChange={(e: any) => setBio(e.target.value)}
                style={{ width: "392px", borderColor: "light" }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography style={{ color: "#919EAB" }}>Gender</Typography>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                  style={{ display: "flex", flexDirection: "row" }}
                >
                  <FormControlLabel
                    value="female"
                    name="gender"
                    onChange={(e: any) => setGender(e.target.value)}
                    control={
                      <Radio required={true} checked={gender === "female"} />
                    }
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    name="gender"
                    onChange={(e: any) => setGender(e.target.value)}
                    control={<Radio required checked={gender === "male"} />}
                    label="Male"
                  />

                  <FormControlLabel
                    value="other"
                    name="gender"
                    onChange={(e: any) => setGender(e.target.value)}
                    control={<Radio required checked={gender === "other"} />}
                    label="other"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={6} sx={{ width: "100%" }}>
              <label style={{ color: "#919EAB" }}>Date of birth</label>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  value={dob}
                  onChange={(newValue: any) => {
                    setDob(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={8}>
              <label style={{ color: "#919EAB" }}>Enter contact number</label>
              <div style={{ height: "50px" }}>
                <PhoneInput
                  country={"in"}
                  inputStyle={{ height: "50px" }}
                  value={mobile}
                  onChange={(e: any) => setMobile(e)}
                />
              </div>
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                fullWidth
                className="btn"
                style={{ width: "100%" }}
                onClick={() => handleEdit()}
              >
                Save Profile
              </Button>
            </Grid>
          </Grid>
        </Card>

        <Drawer open={open} onClose={() => setAnchorEl(null)}>
          <Menu
            id="basic-menu"
            open={open}
            anchorEl={anchorEl}
            // onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            style={{ width: "225px", height: "170px", borderRadius: "12px" }}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
          >
            <MenuItem
              style={{ color: "#212B36", fontWeight: "400" }}
              // onClick={() => setOpenEdit(true)}
            >
              {" "}
              <input
                type="file"
                id="upload-photo"
                style={{ display: "none" }}
                onChange={(e: any) => handleImg(e)}
                name="profilePicture"
              />
              <label htmlFor="upload-photo">
                <AddAPhotoOutlinedIcon
                  style={{ marginRight: "10px", color: "#919EAB" }}
                  onClick={() =>
                    document?.getElementById("upload-photo")?.click()
                  }
                />
                Update photo
              </label>
            </MenuItem>
            <MenuItem
              style={{ color: "#212B36", fontWeight: "400" }}
              onClick={() => removePhoto()}
            >
              <DeleteOutlineIcon
                style={{ marginRight: "10px", color: "#919EAB" }}
              />{" "}
              Remove photo
            </MenuItem>
            <Divider />
            <MenuItem style={{ color: "#212B36", fontWeight: "400" }}>
              <CloseIcon
                style={{ marginRight: "10px", color: "#919EAB" }}
                onClick={() => setAnchorEl(null)}
              />
              Cancel
            </MenuItem>
          </Menu>
        </Drawer>
      </Box>
    </Modal>
  );
}

export default Editprofile;
