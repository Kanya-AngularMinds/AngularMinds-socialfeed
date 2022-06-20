import { Box, Button, Grid, Modal, Typography } from '@mui/material'
import React,{useState} from 'react'
import vector from '../navbar/Vector.png'
import ChildModal from './childmodal';


interface booleanProps{
    discardModal:boolean,
    setDiscardModal:any,
    openChild:boolean,
    setOpenChild:any,
    addModal:boolean,
    setAddModal:boolean,
    closeModal:Function,
}

function Discardimagemodal({discardModal,setDiscardModal,openChild,setOpenChild,setAddModal,closeModal}:booleanProps) {

    closeModal = () =>{
        return false
    }
    const handleClose = () => {
        if(discardModal){
            setOpenChild(false);
            setDiscardModal(false);
            closeModal();
        }else{
            setDiscardModal(true);
        }
    }

    closeModal = () =>{
        return false
    }
    

  return (
  <Modal open={discardModal} onClose={handleClose}>
      <Box  className="addModal">
          <Grid container spacing={3} sx={{ width:300,margin:"auto"}}>
              <Grid item xs={12} style={{ textAlign: "center",height:"250px",fontSize:"50px",marginBottom:"-80px"}}>
                  <img src={vector}  alt="question mark" style={{height:"120px"}}/>
              </Grid>
              <Grid item xs={12}>
                  <Typography style={{fontSize:"12px",color:"#919EAB",textAlign: "center"}}>Do you really want to discard uploading</Typography>
              </Grid>
              <Grid item xs={12} style={{textAlign: "center"}}>
                  <Button variant="contained" onClick={() => handleClose()}>Discard process</Button>
              </Grid>
              <Grid item xs={12}style={{textAlign: "center"}}>
                  <a style={{color: '#1890FF'}} onClick={() => setDiscardModal(false)}>cancel</a>
              </Grid>
            
          </Grid>
       </Box>
  </Modal>
  )
}

export default Discardimagemodal