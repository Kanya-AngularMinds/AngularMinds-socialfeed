import { Box, Button, Modal,Grid, IconButton } from '@mui/material';
import SimpleImageSlider from "react-simple-image-slider";
import React,{useState,useEffect} from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Discardimagemodal from './discardimagemodal';
import UploadModal from './uploadModal';
interface booleanProps{
    openChild: boolean,
    setOpenChild: any,
    image:any, 
    setImage: any,
    closeAddModal: any,
}

 function ChildModal({openChild,setOpenChild,image,setImage,closeAddModal}:booleanProps) {
  
     const[previewImage,setPreviewImage] = useState([]);
     const[discardModal,setDiscardModal] =useState(false);
     const[showModal,setShowModal] = useState(false);
     
     useEffect(() =>{
          let a = image && image.filepreview.map((file:any) =>{
            return file
          }) 
            setPreviewImage(a)
            },[image])
    

            const closeModal = (val:boolean) =>{
              console.log(val);
              setOpenChild(val);
              closeAddModal(false);
            }


    const handleClose =() => {
        if(openChild){
            setOpenChild(false);
        }else{
            setOpenChild(true);
        }
    }
    
  return (
    <React.Fragment>
   
    <Modal
      hideBackdrop
      open={openChild}
      onClose={handleClose}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >

       <Box  className="addModal">
       <div>
         <ArrowBackIcon onClick={() =>setDiscardModal(true)}style={{fontSize:"30px"}}/>
           <a style={{color: '#1890FF',fontSize:"20px",textAlign:"right",float:"right"}} onClick={()=>setShowModal(true)} >Next</a>
      </div>
        { image.filePreview && image.filepriview.length > 1  ?
            
                <SimpleImageSlider
                width={632}
                height={560}
                images={previewImage}
                showBullets={true}
                showNavs={true}
              
              />
              :
             <img src={image.filepreview} alt="img" style={{ width:"632px",
                    height:"560px",borderBottomLeftRadius:"8px",borderBottomRightRadius:"8px"}} />  
                }
                <Discardimagemodal discardModal={discardModal} setDiscardModal={setDiscardModal} setOpenChild={setOpenChild} handleClose={handleClose} />
                <UploadModal showModal={showModal} setShowModal={setShowModal} image={image}  setImage={setImage} closeModal={closeModal} />
        </Box>
    </Modal>
    
  </React.Fragment>
  )
}

export default ChildModal