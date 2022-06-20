import { Box, Button, Card, CardContent, Grid, IconButton, TextField, Typography } from '@mui/material'
import React,{useState} from 'react'
import CloseIcon from "@mui/icons-material/Close";
import {post} from '../../../utils/http/httpMethods'
import {paths} from '../../../routes/routes.config';
import history from "../../../routes/history";
 
function Resetpassword() {
   const [newpassword,setNewPassword] = useState("");
   const [confirmPassword,setConfirmPassword] = useState("");
   const [newPassError,setNewPassError] =useState({error:false,helperText:""})
   const [confirmError,setConfirmError] =useState({error:false,helperText:""})
   
   const handleNewPassword =(e:any) => {
    setNewPassword(e.target.value);
    if(e.target.value === ""){
        setNewPassError({error:true, helperText:" New password is required"})
       }
}

const handleConfirmPass = (e:any) => {
    setConfirmPassword(e.target.value);
    if(e.target.value === "")
    {
        setConfirmError({error:true,helperText:"password is required"})
    }else{
        if(e.target.value !== newpassword){
            setConfirmError({error:true, helperText:"password should match"})
        }else{
            setConfirmError({error:false, helperText:""})
        }
    }
}
 

    const resetPassword = () =>{
        let obj={
         password:confirmPassword,
     }
        post(`http://localhost:8080/auth/reset-password?token=${JSON.parse(localStorage.getItem("resetPassToken") as any)}`, obj).then((response) =>{
            console.log(response)
        })
    }
  return (
    <Card
    sx={{
      // position: "absolute",
      width: "512px",
      margin:"auto",
      height: "412px",
      // left: "464px",
       marginTop: "150px",
      background: "#FFFFFF",
      boxShadow: "-1px -1px 4px rgba(33, 43, 54, 0.1), 2px 2px 4px rgba(33, 43, 54, 0.2)",
      borderRadius: "8px",
      padding: "32px 16px",
      gap: "36px"
    }}
  >
   
       
    
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
      Set  your new  password
    </Typography>
    <br />

    <CardContent>
   
    <Box component="form"
    sx={{ mt: 1 }}>

     
      <Grid container spacing={4} sx={{ textAlign: "center" }}>
      <Grid item xs={12}>
        <TextField
        type="password"
          id="outlined-required"
          label="New Password"
          value={newpassword}
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
     
      
      <Grid item xs={12}>
        <a style={{color: '#1890FF'}} onClick={()=>{history.push(paths.login); window.location.reload()}}>Back</a>
        
      </Grid>
    </Grid>
     

    </Box>
    </CardContent>
  </Card>
  )
}

export default Resetpassword