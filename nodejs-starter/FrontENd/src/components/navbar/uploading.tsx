import { Box, Button, Grid, IconButton, Modal, Typography } from '@mui/material';
import React,{useState,useEffect} from 'react'
import CloseIcon from "@mui/icons-material/Close";
import bro from "../navbar/bro.jpg"
import LinearProgress from '@mui/material/LinearProgress';
interface booleanProps{
    uploading:boolean,
    setUploading:any, 
    progress:number
}

function Uploading({uploading,setUploading,progress}:booleanProps) {
  
    

  return (
    <Modal open={uploading} onClose={() => setUploading(false)}>
    <Box className="addModal">
   
      <Grid container spacing={3} sx={{ width: 230, margin: "auto" }}>
     <IconButton  onClick={() => setUploading(false)}>
      <CloseIcon
      style={{ position: "relative", top: "-400%", right: "-1600%" }}
      
    />
      </IconButton>
        <Grid item xs={12}>
          <img
              src={bro}
              alt="upload"
              style={{ height: "180px",marginBottom: "90px"}}
            
            />
       </Grid>

       <Grid item xs={12}>
         <Typography style={{color: "#919EAB"}}>Uploading...</Typography>
       </Grid>
     <Grid item xs={12}>
     <LinearProgress variant="determinate" value={progress} />
        </Grid>
      
    
      </Grid>
      
    </Box>
   
  </Modal>
  )
}

export default Uploading