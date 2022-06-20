import React, { useState } from "react";
import { useForm } from "react-hook-form";
import history from "../../../routes/history";
import "./login.scss";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { authenticationService } from "../../../utils/auth.service";
import LoadingButton from "@mui/lab/LoadingButton";
import { Card, CardContent, IconButton, InputAdornment, Paper } from "@mui/material";

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import GoogleLogin, { GoogleLogout } from "react-google-login"
import Divider from "../../divider/divider"

export default function Login() {
  const CLIENT_ID = '1000201961441-75vud78qacn9f6g94tel5kfnk4l5qcoh.apps.googleusercontent.com'
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [email,setEmail] =useState("");
  const [password,setPassword] = useState("");
  const [showPassword,setShowPassword] = useState(true);
  const { handleSubmit,register,control, formState: { errors }  } = useForm<FormData>() as any;
  const theme = createTheme();

  /*
   * Verify Credentials
   */
  const doLogin = (formData: any) => {
    console.log(formData);
   
    let obj={
      email:email,
      password:password,
    }
    
    setButtonDisabled(true);
    authenticationService
      .verifyCredentials(obj)
      .then((response: any) => {
        setButtonDisabled(false);
      })
      .catch((error) => {
        setButtonDisabled(false);
      });
      return obj;
  };
    console.log(errors);
  
  const handleEmail =(e:any) =>{
     setEmail(e.target.value);
     errors.email=false;
   }

  const handlePassword =(e:any) => {
    setPassword(e.target.value);
      errors.password=false;
    }

  const  handleShowPassword = (e:any) =>{
    if(showPassword == true){
      setShowPassword(false)
    }else{
      setShowPassword(true)
    }
  }

  /*
   * Render
   */
  return (
    <ThemeProvider theme={theme}>
        
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Card
          sx={{
            // position: "absolute",
            width: "512px",
            // margin:"auto",
            height: "566px",
            // left: "464px",
             marginTop: "150px",
            background: "#FFFFFF",
            boxShadow: "-1px -1px 4px rgba(33, 43, 54, 0.1), 2px 2px 4px rgba(33, 43, 54, 0.2)",
            borderRadius: "8px",
            padding: "32px 16px",
            gap: "32px"
          }}
        >
         
          <Typography component="h1" variant="h5" 
          sx={{
            width: "245px",
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
            Sign in to Social Feed
          </Typography>
          <CardContent>
          <Box
            component="form"
            onSubmit={handleSubmit(doLogin)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              value={email}
              {...register("email" as any,{
                required: "email is required",
                pattern:{
                  value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                  message:"invalid email address"
                }
              })}
              // defaultValue="navanath@angularminds.com"
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={(e)=> handleEmail(e)}
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
              
            />
            <TextField
             {...register("password" as any,{
               required: "password is required", 
               minLength:{
                 value:8,
                 message: "password must be at least 8 characters"
               },
             
              })}
              margin="normal"
              required
              fullWidth
              value={password}
              name="password"
              label="Password"
              onChange={(e) => handlePassword(e)}
              type={showPassword ? "password" : "text"}
              id="password"
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                       onClick={handleShowPassword}
                      // onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                       {showPassword ? <RemoveRedEyeIcon /> :  <RemoveRedEyeIcon />} 
                    </IconButton>
                  </InputAdornment>)
              }}
            />
           
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 ,backgroundColor:"#1890FF",width: "450px",
              height: "48px",fontWeight:700,fontSize:"16px"}}
              loading={isButtonDisabled}
            >
              Sign In
            </LoadingButton>
             <Grid  container justifyContent="flex-end">
                <a  onClick={()=>{history.push("/auth/forgotpassword"); window.location.reload()}}>
                  Forgot password?
                </a>
              </Grid>
            <br />
              <Grid container>
              <Grid item className="text-primary">
             Don't have an account yet?<a style={{color: '#1890FF'}} onClick={authenticationService.signup}> Sign up</a> 
              </Grid> 
             </Grid>
             <br/>
             <Grid container>
               <Grid item sx={{display:"flex"}}>
              <Divider>OR</Divider>
               </Grid>
             </Grid>

<br />
<br/>
             <Grid container>
               <Grid item sx={{ margin:'auto', width:200}}>
               <GoogleLogin
           clientId={CLIENT_ID}
          buttonText="Sign in with Google"
          // onSuccess={responseGoogle}
          // onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
               </Grid>
             </Grid>
            
          </Box>
          </CardContent>
        </Card>
      </Container>
      
    </ThemeProvider>
  );
}
