import { LoadingButton } from '@mui/lab';
import { useForm } from "react-hook-form";
import { Box, Button, Card, CardContent, Container, Grid, IconButton, InputAdornment, Modal, Paper, TextField, Typography } from '@mui/material'
import { get, post, put } from "../../../utils/http/httpMethods";
import React,{useState} from 'react'
import { authenticationService } from "../../../utils/auth.service";
import { VisibilityOff, VisibilityOffOutlined } from '@mui/icons-material';
import CssBaseline from "@mui/material/CssBaseline";
import history from "../../../routes/history";
import {paths} from '../../../routes/routes.config'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
 
export default function Signup () {
  const [firstName,setFirstName] = useState("");
  const [lastName,setLastName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const {handleSubmit, register, formState:{ errors}} = useForm()
  const [showPassword,setShowPassword] = useState(true);

  const doSignup = (formData: any) => {
    console.log(formData);
    let obj= {
      firstName:firstName,
      lastName:lastName,
      email:email,
      password:password
    }
    setButtonDisabled(true);
    authenticationService
      .register(obj)
      .then((response: any) => {
        localStorage.setItem('signupToken', JSON.stringify(response.token));
        console.log(response.token)
        // setOpenModal(true);
        //open modal and write it in that onsubmit
        setButtonDisabled(true);
      })
      .catch((error) => {
        setButtonDisabled(false);
      });
      return obj;
  };
  
  const handleVerification = (email:any) =>{
   
      let token= JSON.parse(localStorage.getItem("signupToken") as any)
      let obj={
        email:email,
         token: token
      }
      
    post('http://localhost:8080/auth/send-verification-email',obj).then((response: any) => {
          console.log(response)
        })
  }
 
  return (

    
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <Card
      sx={{
        // position: "absolute",
        width: "542px",
        // margin:"auto",
        minHeight: "440px",

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
        Sign up to Social Feed
      </Typography>
      <CardContent>
      <Box
        component="form"
        onSubmit={handleSubmit(doSignup)}
        noValidate
      
      >
         <Grid container spacing={1} sx={{ textAlign: "center" }}>
        
        <TextField
          margin="normal"
          required
          // fullWidth
          value={firstName}
          {...register("firstName",{ 
             required:"First name is required",
          })}
          // defaultValue="navanath@angularminds.com"
          id="firstname"
          label="First Name"
          name="firstName"
          onChange={(e)=> {setFirstName(e.target.value); errors.firstName=false;}}
          error={Boolean(errors.firstName)}
          helperText={errors.firstName?.message}
          
        />
       
    
        <TextField
          margin="normal"
          sx={{ml:"15px"}}
          required
          // fullWidth
          value={lastName}
          // defaultValue="navanath@angularminds.com"
          {...register("lastName",{
            required:"lastName is required"
          })}
          id="lastname"
          label="Last Name"
          name="lastName"
          onChange={(e)=> {setLastName(e.target.value);errors.lastName=false}}
          error={Boolean(errors.lastName)}
          helperText={errors.lastName?.message}
          
        />
        
        <TextField
          margin="normal"
          required
          fullWidth
          value={email}
          {...register("email" as any,{
            required:"email is required", 
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
          onChange={(e)=> {setEmail(e.target.value);errors.email=false}}
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
          
        />
        <TextField
          margin="normal"
          required
          fullWidth
          value={password}
          {...register("password" as any,{
            required:"password is required"
          })}
          name="password"
          label="Password"
          onChange={(e) => {setPassword(e.target.value);errors.password = false}}
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
                   onClick={() => setShowPassword(!showPassword)}
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
          sx={{ mt: 3, mb: 2 ,backgroundColor:"#1890FF",
          height: "48px",fontWeight:700,fontSize:"16px"}}
          loading={isButtonDisabled}
        >
          Sign Up
        </LoadingButton>
      
        <br />
          <Grid container>
          <Grid item className="text-primary" style={{color:'#637381'}}>
         Already having an account?<a style={{color: '#1890FF'}} onClick={()=>{history.push(paths.login);window.location.reload()}}> Sign in</a> 
          </Grid> 
         </Grid>
         <br/>
        


      
        </Grid>
      </Box>
      </CardContent>
    </Card>
  </Container>
  )
}

