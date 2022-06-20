import { Grid } from '@mui/material';
import React,{useState,useEffect} from 'react'
import { get } from '../../utils/http/httpMethods'
import SimpleImageSlider from "react-simple-image-slider";
import Home from '../home/home';


function Bookmarks() {
const userObj = JSON.parse(localStorage.getItem("currentUser") as any);
const [bookmarks,setBookmarks] = useState([]);
const [allBookmarks,setAllBookmarks] = useState([] as any)
const [images,setImages]= useState([] as any );
const [openCommentModal,setOpenCommentModal] = useState(false);

      useEffect(() => {
      get('http://localhost:8080/users?limit=100').then((response:any) => {
        let a= response.results.filter((res:any) =>  res._id === userObj._id);
        setBookmarks(a[0].bookmark);
      })
      },[])

      useEffect(() => {
      get('http://localhost:8080/feeds').then((response:any) =>{
          let images = response.results.filter((bk:any)=>{
          let arr = bookmarks.filter((res:any) => res.feedId === bk._id);
          return !(arr.length === 0)
        } )
    setAllBookmarks(images)

      let arrayImgs =  images.map((feed:any) =>{
        return  feed.photos.map((photo:any) =>{
            return `http://192.168.0.87:8080/${photo.fileName}`;
            })
        })
        setImages(arrayImgs);
      })
    },[bookmarks])

  return (
    <Grid container spacing={2} sx={{marginTop:"5px"}}>
      {allBookmarks.map((book:any,index:number) => {
        return(
        book.photos.length > 1 ?
        <Grid item xs={4} onClick={() => setOpenCommentModal(true)}>
        <SimpleImageSlider
            width={400}
            height={430}
            images={images[index]}
            showBullets={true}
            showNavs={true}
          />
           </Grid>
           :
           <Grid item xs={4}>
           {book.photos.map((photo:any,index:number) =>{
             return(
               <>
              
               <img src={photo.fileName} style={{width:"400px",height:"430px"}} onClick={() => setOpenCommentModal(true)} />
               </>
             )
           })}
           </Grid>
      )
      } )}
    
 
   </Grid>
  )
}

export default Bookmarks