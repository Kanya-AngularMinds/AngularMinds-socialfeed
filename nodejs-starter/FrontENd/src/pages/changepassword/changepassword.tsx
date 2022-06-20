import { Box, Button, Card, CardContent, Container, Grid, IconButton, Modal, TextField, Typography } from '@mui/material'
import React,{useState} from 'react'
import CssBaseline from "@mui/material/CssBaseline";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import CloseIcon from "@mui/icons-material/Close";
import { patch } from '../../utils/http/httpMethods';
interface booleanProps{
    modal:boolean,
    setModal:any,
  }

function ChangePassword({modal,setModal}:booleanProps) {
   
    const[password,setPassword] =useState("");
    const[newPassword,setNewPassword] =useState("");
    const[confirmPassword,setConfirmPassword] =useState("");
    const [passError,setPassError] =useState({error:false,helperText:""})
    const [newPassError,setNewPassError] =useState({error:false,helperText:""})
    const [confirmError,setConfirmError] =useState({error:false,helperText:""})



    const resetPassword = () =>{
      let obj ={
        oldPassword: password,
        newPassword:newPassword,
        confirmPassword:confirmPassword
      }
      patch('http://localhost:8080/users/changePassword', obj).then((response) =>{
        console.log(response);
        setModal(false);
      })
    }

    const handleCloseModal = () => {
        if(modal){
            setModal(false);
        }else{
            setModal(true);
        }
    }

    const handlePassword = (e:any) => {
       setPassword(e.target.value);
       if(e.target.value === ""){
        setPassError({error:true, helperText:"password is required"})
       }
    }

    const handleNewPassword =(e:any) => {
        setNewPassword(e.target.value);
        if(e.target.value === ""){
            setNewPassError({error:true, helperText:" New password is required"})
           }
    }

    const handleConfirmPass = (e:any) => {
      setConfirmPassword(e.target.value)
        if(e.target.value === "")
        {
            setConfirmError({error:true,helperText:"password is required"})
        }else{
            if(e.target.value !== newPassword){
                setConfirmError({error:true, helperText:"password should match"})
            }else{
                setConfirmError({error:false, helperText:""})
            }
        }
    
     
    }
  return (
     <Modal
      open={modal}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
        <Container component="main" maxWidth="xs">
       
        <CssBaseline />
      
      <Card
          sx={{
            // position: "absolute",
            width: "512px",
            margin:"auto",
            height: "480px",
            // left: "464px",
             marginTop: "150px",
            background: "#FFFFFF",
            boxShadow: "-1px -1px 4px rgba(33, 43, 54, 0.1), 2px 2px 4px rgba(33, 43, 54, 0.2)",
            borderRadius: "8px",
            padding: "32px 16px",
            gap: "36px"
          }}
        >
         
              <IconButton onClick={() => setModal(false)}>
              <CloseIcon
              style={{ position: "relative", top: "-5%", right: "-1900%" }}
               
            />
              </IconButton>
          
           <Typography component="h1" variant="h5" 
          sx={{
            width: "345px",
            height: "36px",
            fontFamily: 'Public Sans',
            fontStyle: "normal",
            fontWeight: 700,
            fontSize: "25px",
            lineHeight: '36px',
            color: "#212B36",
            // flex: "none",
            // order: 0,
            // flexGrow: 0,
            textAlign: "center",
            justifyContent: "center",
            margin: "auto"
           }}>
            Reset your  Password
          </Typography>

          <CardContent>
         
          <Box component="form"
          sx={{ mt: 1 }}>

           
            <Grid container spacing={2} sx={{ textAlign: "center" }}>
            
            <Grid item xs={12}>
              <TextField
              type="password"
                id="outlined-required"
                label="Current Password"
                value={password}
               error={passError.error}
               helperText={passError.helperText}
                onChange={(e:any) => handlePassword(e)}
                fullWidth
              />
            </Grid>
           <Grid item xs={12}>
              <TextField
              type="password"
                id="outlined-required"
                label="New Password"
                value={newPassword}
               error={newPassError.error}
               helperText={newPassError.helperText}
                onChange={(e:any) => handleNewPassword(e)}
                fullWidth
              />
            </Grid>
           <Grid item xs={12}>
              <TextField
                type="password"
                id="outlined-required"
                label="Confirm new Password"
                error={confirmError.error}
                helperText={confirmError.helperText}
                onChange={(e:any)=>handleConfirmPass(e)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
            <Button
             fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 ,backgroundColor:"#1890FF",width: "450px",
              height: "48px",fontWeight:700,fontSize:"16px"}}
              // loading={isButtonDisabled}
              onClick={()=> resetPassword()}
            >
              Reset Password
            </Button>
             </Grid>
           
            
            {/* <Grid item xs={12}>
              <a style={{color: '#1890FF'}} onClick={handleCloseModal}>Back</a>
              
            </Grid> */}
          </Grid>
           
   
          </Box>
          </CardContent>
        </Card>
        </Container>
    </Modal> 
  )
}

export default ChangePassword