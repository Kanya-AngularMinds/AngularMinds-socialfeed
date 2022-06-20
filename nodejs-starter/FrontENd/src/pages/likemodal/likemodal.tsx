import { Avatar, Card, Divider, Grid, Modal, Typography } from '@mui/material'
import React,{useEffect, useState} from 'react'
import { get } from '../../utils/http/httpMethods';
import CloseIcon from "@mui/icons-material/Close";
// import './likemodal.css';

interface booleanProps{
    openLikes: boolean,
    setOpenLikes: any,
    post:any,
}

function Likemodal({openLikes,setOpenLikes,post} :booleanProps) {
 
 const [allFeeds,setAllFeeds] =useState([]);
    useEffect(() => {
      get("http://localhost:8080/feeds?limit=3").then((response:any) => {
          setAllFeeds(response.results)
      })
    },[])
  return (
    <Modal open={openLikes} onClose={() =>{setOpenLikes(false)}}>
       <Card sx={{
          display: "flex",
          flexDirection:"row",
         
          padding: "56px 0px 0px",
          position: "absolute",
          minHeight: "523.85px",
        //   overflowY: "scroll",
          width: "auto",
          left: "34.38%",
          right: "34.38%",
          top: "calc(50% - 523.85px/2 - 0px)",
          background: "#FFFFFF",
          borderRadius: "8px"
       }}>
           <div style={{display: "flex",flexDirection: "column",width:"529px"}}>
          <div style={{display: "flex"}}>
               <Typography sx={{justifyContent: "center",margin: "auto",color:"#212B36",fontWeight:400,fontSize:"18px"}}>Likes</Typography>
               <CloseIcon   sx={{color:"#919EAB"}} onClick={() => setOpenLikes(false)}/>
            </div>
            <Divider />
           
           <div style={{overflowY: "scroll",minHeight:"500px"}}>
            {post && post.map((p:any)=>{
                   return(
                    
                        <div style={{display: "flex",padding:"10px"}}>
                       <Avatar src={p.likedBy.profilePicture} sx={{height:"60px",width:"60px"}}></Avatar>
                       <Typography sx={{padding:"20px",color:"#212B36",fontWeight:600,fontSize:"20px"}}>{p.likedBy.firstName} &nbsp; {p.likedBy.lastName}</Typography>
                       </div>
                   )}
            )}
              
         </div>
          </div>
         
       </Card>
    </Modal>
  )
}

export default Likemodal