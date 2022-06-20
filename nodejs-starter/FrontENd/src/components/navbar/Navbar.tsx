import React, { useState, useRef } from "react";
import "./Navbar.scss";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { authenticationService } from "../../utils/auth.service";
import { Avatar,Box,Button,Grid,Menu,MenuItem, Modal} from "@mui/material";
import ChangePassword from "../../pages/changepassword/changepassword";
import amLogo from "../navbar/amLogo.png"
import HomeIcon from "@mui/icons-material/Home";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import LockResetOutlinedIcon from "@mui/icons-material/LockResetOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import Divider from "@mui/material/Divider";
import ChildModal from '../navbar/childmodal'
import bro from "../navbar/bro.jpg"
import Discardimagemodal from "./discardimagemodal";
import Editprofile from "../../pages/edit/editprofile";
import CloseIcon from "@mui/icons-material/Close";
import history from "../../routes/history";
import MenuIcon from '@mui/icons-material/Menu';
export type NavbarProps = {
  /**
   * To be triggered on logout click
   */
  onLogout?: any;
};



export const Navbar = ({ onLogout }: NavbarProps) => {
  /**********state declaration********/
  const [anchorEl, setAnchorEl] = useState(null);
  const [modal, setModal] = useState(false);
  const [addModal, setAddModal] = useState(false) as any ;
  const [image, setImage] = useState({ file:[], filepreview:[]}) as any;
  const [multiple, setMultiple] = useState(false);
  const [openChild, setOpenChild] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [menu,setMenu] = useState(false);
 
  let fileObj:any[] =new Array() ;
  let fileArray:any[] =new Array() ;
  const fileRef = useRef() as any;
  const open = Boolean(anchorEl);
  let userObj = JSON.parse(localStorage.getItem("currentUser") as any);
 
  const handleClick = (e: any) => {  setAnchorEl(e.currentTarget); setMenu(true)};

  const handleClose = () => { setAnchorEl(null); setMenu(false); };
 
  const handleOpen = () => setModal(true);
  
  const onImageChange = (e: any) => {

  fileObj.push(e.target.files)
        for (let i = 0; i < fileObj[0].length; i++) {
            fileArray.push(URL.createObjectURL(fileObj[0][i]))
        }
      setImage({ file: Array.from(e.target.files), filepreview:fileArray})
  };

   const closeAddModal =(val:any) =>{
        setAddModal(false);
      }
  
      return (
    <>
      <AppBar position="static" style={{ color: "black", background: "white" }}>
        <Toolbar variant="dense">
          <Box style={{flexGrow:0.5}} />
            <Typography
            variant="h6"
            color="inherit"
             style={{ flex: 1}} 
            
            >
           <img
                src={amLogo}
                alt="logo"
                className="amLogo"
                // style={{ height: "28px",width:"101px", marginTop: "10px", fontSize:"24px" }}
              />
             </Typography>
             <IconButton className="menu-icon">
             <MenuIcon />
             </IconButton>
       
          <Box
            sx={{
              display: {
                xs: "none",
                md: "flex",
                marginRight: "170px",
                paddingLeft: "20px",
                },
            }}
            className="navIcons"
          >
            <IconButton>
              <HomeIcon style={{ color: "black" }} />
            </IconButton>
            <IconButton  onClick={() => {setAddModal(true);setMultiple(true)}}>
              <AddAPhotoOutlinedIcon
                style={{ color: "black" }}
               
              />
            </IconButton>
            <IconButton  onClick={() => {history.push("/bookmarks");window.location.reload()} }>
              <BookmarkBorderOutlinedIcon style={{ color: "black" }} />
            </IconButton>
            <IconButton onClick={handleClick}>
            <Avatar
              id="basic-button"
               style={{
                marginTop: "10px",
                marginRight: "5px",
                height: "35px",
                width: "35px",
              }}
               src={userObj ? `http://localhost:8080/${userObj.profilePicture}`:null}
           />
            </IconButton>
          <h3>{`${userObj.firstName}`}&nbsp;{userObj.lastName}</h3>
          </Box>
        <Modal open={menu} onClose={() => setMenu(false)}>
        <Menu
            id="basic-menu"
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
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
              onClick={() => setOpenEdit(true)}
            >
              {" "}
              <ManageAccountsOutlinedIcon
                style={{ marginRight: "10px", color: "#919EAB" }}
              />
              Edit Profile
            </MenuItem>
            <MenuItem
              style={{ color: "#212B36", fontWeight: "400" }}
              onClick={handleOpen}
            >
              <LockResetOutlinedIcon
                style={{ marginRight: "10px", color: "#919EAB" }}
              />{" "}
              Change Password
            </MenuItem>
            <Divider />
            <MenuItem
              style={{ color: "#212B36", fontWeight: "400" }}
              onClick={() => {
                authenticationService.localLogout();
              }}
            >
              <LogoutOutlinedIcon
                style={{ marginRight: "10px", color: "#919EAB" }}
              />
              Logout
            </MenuItem>
          </Menu>
        </Modal>
       

          <Modal open={addModal} onClose={() =>  setAddModal(false)}>
            <Box className="addModal">
           
              <Grid container spacing={3} sx={{ width: 230, margin: "auto" }}>
             <IconButton  onClick={() => setAddModal(false)}>
              <CloseIcon
              style={{ position: "relative", top: "-400%", right: "-1600%" }}
              
            />
              </IconButton>
                <Grid item xs={12}>
                  <input
                    type="file"
                    ref={fileRef}
                    name="photos"
                    style={{ display: "none" }}
                    onChange={(e) => onImageChange(e)}
                    multiple
                  />
                <img
                      src={bro}
                      alt="upload"
                      style={{ height: "180px",marginBottom: "90px"}}
                    
                    />
               </Grid>
             <Grid item xs={12}>
               <Button variant="contained"   onClick={() => {fileRef.current?.click();setOpenChild(true)}}>
                    Upload from device
                  </Button>
                </Grid>
                <ChildModal  openChild={openChild} setOpenChild={setOpenChild} image={image} setImage={setImage} closeAddModal={closeAddModal}/>
                <Discardimagemodal openChild={openChild} setOpenChild={setOpenChild} addModal={addModal} setAddModal={setAddModal}  />
            
              </Grid>
              
            </Box>
           
          </Modal>
      <ChangePassword modal={modal} setModal={setModal} /> 
        <Editprofile openEdit={openEdit} setOpenEdit={setOpenEdit} />
      
          </Toolbar>
      </AppBar>
    </>
  );
};
