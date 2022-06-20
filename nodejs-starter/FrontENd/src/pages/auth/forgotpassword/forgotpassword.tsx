import React,{useState} from 'react'
import { Box, Button, Card, CardContent, Container, Grid, Paper, TextField, Typography } from '@mui/material'
import history from "../../../routes/history";
import CssBaseline from "@mui/material/CssBaseline";
import {paths} from '../../../routes/routes.config';
import { authenticationService } from "../../../utils/auth.service";
import { useForm } from "react-hook-form";
function ForgotPassword() {
   const [email,setEmail] =useState("");
   const [emailErrorState,setEmailErrorState] = useState({error:false , helperText:""});
   const [isButtonDisabled, setButtonDisabled] = useState(false);
   const { handleSubmit } = useForm();
   
   const handleEmail = (e:any) =>{
    setEmail(e.target.value);
   if(e.target.value === ""){
     setEmailErrorState({helperText:"Email is required" , error:true})
   } else{
     setEmailErrorState({helperText:"",error:false})
   }
   let regx= /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
   
   if(!regx.test(e.target.value)){
     setEmailErrorState({helperText:"please enter valid email",error:true})
   }else{
     setEmailErrorState({helperText:"",error:false})
   }
  }

  const forgotPassword = (formData: any) => {
    let obj={
      email:email,
    }
    
    setButtonDisabled(true);
    authenticationService.forgotpassword(obj)
    

    // authenticationService
    //   .forgotpassword(obj)
    //   .then((response: any) => {
    //     setButtonDisabled(false);
    //   })
    //   .catch((error) => {
    //     setButtonDisabled(false);
    //   });
      return obj;
  };

  return (
  
    <Container component="main" maxWidth="xs">
    <CssBaseline />
  
  <Card
      sx={{
        // position: "absolute",
        width: "512px",
        margin:"auto",
        height: "430px",
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
        Forgot your password?
      </Typography>

      <CardContent>
      <Box 
      component="form"
      onSubmit={handleSubmit(forgotPassword)}
      sx={{ mt: 1 }}>

        
        <Grid container spacing={2} sx={{ textAlign: "center" }}>
          <Grid item xs={12}>
          <Typography className="text-muted" style={{color:"#637381"}}>Please enter the email address associated with your account, and we'll email you a link to reset your password</Typography>
          </Grid>
       <Grid item xs={12}>
          <TextField
          type="email"
            id="outlined-required"
            label="Email address"
           value={email}
            error={emailErrorState.error}
           helperText={emailErrorState.helperText}
             onChange={(e:any) => handleEmail(e)}
            fullWidth
          />
        </Grid>
      
        <Grid item xs={12}>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 ,backgroundColor:"#1890FF",width: "450px",
          height: "48px",fontWeight:700,fontSize:"16px"}}
         
          // loading={isButtonDisabled}
        >
          Reset Password
        </Button>
         </Grid>
       
        
        <Grid item xs={12}>
          <a style={{color: '#1890FF'}} onClick={()=>{history.push(paths.login); window.location.reload()}}>Back</a>
          {/* <Button variant="contained" >Cancel</Button> */}
        </Grid>
      </Grid>
       

      </Box>
      </CardContent>
    </Card>
    </Container>
    
  )
}

export default ForgotPassword