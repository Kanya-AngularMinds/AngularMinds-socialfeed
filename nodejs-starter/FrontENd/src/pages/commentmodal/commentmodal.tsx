// import { Avatar, Box, Divider, Grid, IconButton, InputAdornment, Modal, TextField, Typography } from '@mui/material';
// import React,{useState,useEffect,useRef} from 'react'
// import SimpleImageSlider from "react-simple-image-slider";
// import CloseIcon from "@mui/icons-material/Close";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import moment from "moment";
// import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
// import { get, patch } from '../../utils/http/httpMethods';
// import Picker from "emoji-picker-react";
// import Likemodal from "../likemodal/likemodal";
// interface booleanProps{
//     openComment: boolean,
//     setOpenComment: any, 
//     allFeeds: any, 
//     ind:number,
//     allUsers: any,
//     post:any, 
//     getAllFeeds: any
// }
// function Commentmodal({openComment,setOpenComment,allFeeds,ind,allUsers,post,getAllFeeds} : booleanProps) {
//     const [showReply,setShowReply] =useState<boolean[]>([]);
//     const [newComment,setNewComment] = useState("");
//     const [images, setImages] = useState([]);
//     const [feedId,setFeedId] = useState("");
//     const [inputStr,setInputStr] = useState("");
//     const [commentPicker, setCommentPicker] = useState(false);
//     const [showPicker,setShowPicker] = useState(false);
//     const userObj = JSON.parse(localStorage.getItem("currentUser") as any);
//     const [openLikes,setOpenLikes]=useState(false);
//     const replyRef = useRef("" as any);

//     useEffect(() => {
          
//         let arrayImgs = allFeeds.map((feed: any) => {
//             return feed.photos.map((photo: any) => {
//               return `http://192.168.0.87:8080/${photo.fileName}`;
//             });
//           });
//           setImages(arrayImgs);


//         const displayReplies = () => {
//           let res = allFeeds.map((rs: any) => {
//               setShowReply(Array(allFeeds[ind]["comment"]["length"]).fill(false));
//             });
//           };
//           displayReplies();
//     },[])

//     const onEmojiClick = (event: any, emojiObject: any) => {
//         setNewComment((prevInput) => prevInput + emojiObject.emoji);
//         setInputStr((prevInput) => prevInput + emojiObject.emoji);
//         setShowPicker(false);
//       };

//      /*************************************like to comment***************************************************/
//   const likeComment = (commentId: any, feedId: any) => {
//     patch(
//       `http://localhost:8080/feeds/likeComment/${feedId}/${commentId}`
//     ).then((response: any) => {
//         const newFunc = () =>{ 
//             get("http://localhost:8080/feeds?limit=100").then((response: any) => {
//                  getAllFeeds(response.results);
//         })
//         newFunc();
//     } });
  
//   };
//   const replyFunc= () =>{ 
//     get("http://localhost:8080/feeds?limit=100").then((response: any) => {
//         return(response.results);
//         })
//         }

//     /*************************************Reply to comment***************************************************/
//     const postCommentReply = () => {
//         let trimmedComment = newComment.split("_").pop();
    
//         allFeeds.map((feed: any, index: number) => {
//           if (ind === index) {
//             patch(
//               `http://localhost:8080/feeds/repliedComments/${feed._id}/${feedId}`,
//               { comment: trimmedComment }
//             ).then((response) => {
//                 replyFunc();
//               });
//           }
//         });
//         setNewComment("");
//       };

//         /*************************************Boolean array of posts length***********************************/
     
  
//        /*************************************show reply of comment***********************************/
//           const showSpecificReplies = (index: number) => {
//               let newArr = [...showReply];
//               newArr[index] = true;
//               setShowReply(newArr);
            
//           };
  
//       /*************************************hide reply of comment***********************************/
//           const hideReply = (index: number) => 
//              {
//                 let newArr = [...showReply];
//                 newArr[index] = false;
//                 setShowReply(newArr);
//              };
  
      
//   return (
//     <Modal
//     open={openComment}
//     style={{
//       backgroundColor: "transparent",
//       padding: "80px",
//       height: "auto",
//       minWidth: "400px",
//     }}
//     disableAutoFocus={true}
//     onClose={() => setOpenComment(false)}
//     aria-labelledby="modal-modal-title"
//     aria-describedby="modal-modal-description"
//   >
//     <Box
//       sx={{
//         width: "990px",
//         height: "650px",
//         display: "grid",
//         minWidth: "300",
//         gridTemplateColumns: "1fr 1fr",
//         justifyContent: "center",
//         margin: "auto",
//         alignItems: "center",
//         background: "#fff",
//       }}
//     >
//       <div>
//         {allFeeds.map((feed: any, i:number) => {
//           return (
//             i === ind &&
//             (feed["photos"]["length"] > 1 ? (
//               <SimpleImageSlider
//                 width={495}
//                 height={650}
//                 images={images[i]}
//                 showBullets={true}
//                 showNavs={true}
//               />
//             ) : (
//               feed["photos"]["map"]((photo: any, i: any) => {
//                 return (
//                   <img
//                     src={photo.fileName}
//                     alt="img"
//                     height="650px"
//                     width="495px"
//                   />
//                 );
//               })
//             ))
//           );
//         })}
//       </div>
//       <div>
//         <CloseIcon
//           style={{ position: "relative", right: "-520px" }}
//           onClick={() => setOpenComment(false)}
//         />
//         <Grid
//           item
//           xs={12}
//           style={{ display: "flex", padding: "10px", marginTop: "-20px" }}
//         >
//           {allUsers.map((user: any, i: any) => {
//             return allFeeds.map((feed: any, i:number) => {
//               return (
//                 i == ind &&
//                 feed.CreatedBy._id === user._id && (
//                   <>
//                   {console.log("--------------------",feed)}
//                     <Avatar
//                       src={user.profilePicture}
//                       style={{
//                         marginTop: "10px",
//                         height: "60px",
//                         width: "60px",
//                       }}
//                     />
//                     <div
//                       style={{
//                         display: "flex",
//                         flexDirection: "column",
//                         padding: "10px",
//                         width: "200%",
//                         lineHeight: "2px",
//                       }}
//                     >
//                       <Typography>
//                         {user.firstName}&nbsp;&nbsp;{user.lastName}
//                       </Typography>
//                       <Typography style={{ color: "#637381" }}>
//                         International space station
//                       </Typography>
//                       <Typography
//                         style={{
//                           textOverflow: "ellipsis",
//                           width: "250px",
//                           whiteSpace: "nowrap",
//                           overflow: "hidden",
//                         }}
//                       >
//                         {feed.caption}
//                       </Typography>
//                     </div>
//                     <Grid container justifyContent="flex-end">
//                       <Typography
//                         style={{ marginTop: "10px", width: "100%" }}
//                       >
//                         {moment(feed.createdAt).fromNow()}
//                       </Typography>
//                     </Grid>
//                   </>
//                 )
//               );
//             });
//           })}
//           <Divider></Divider>
//         </Grid>
//         <Grid item xs={12} style={{ overflowY: "scroll", height: "390px" }}>
//           {/* map comments array display profile pic user name comment and time and reply and likes and scrollbar */}
//           {allFeeds.map((feed: any, index: any) => {
//             return index === ind
//               ? feed.comment.map((comment: any, index: any) => {
//                   return (
//                     <>
//                       <div style={{ display: "flex" }}>
//                         <div
//                           style={{
//                             display: "flex",
//                             padding: "10px",
//                             cursor: "pointer",
//                           }}
//                           onClick={() => hideReply(index)}
//                         >
//                           <Avatar style={{ height: "55px", width: "55px" }}>
//                             <img
//                               src={comment.commentBy?.profilePicture}
//                               alt="img"
//                             />
//                           </Avatar>
//                         </div>

//                         <div
//                           style={{
//                             display: "flex",
//                             padding: "10px",
//                             flexDirection: "column",
//                           }}
//                         >
//                           <div
//                             style={{ display: "flex", cursor: "pointer" }}
//                             onClick={() => hideReply(index)}
//                           >
//                             <Typography style={{ marginLeft: "10px" }}>
//                               {comment.commentBy?.firstName}&nbsp;&nbsp;
//                               {comment.commentBy?.lastName}
//                             </Typography>
//                             <Typography
//                               style={{
//                                 marginLeft: "10px",
//                                 color: "#919EAB",
//                               }}
//                             >
//                               {comment.comment}
//                             </Typography>
//                             <IconButton
//                               color={
//                                 comment.likes.includes(userObj._id)
//                                   ? "error"
//                                   : "default"
//                               }
//                               style={{ justifyContent: "flex-end" }}
//                               onClick={() =>
//                                 likeComment(comment._id, feed._id)
//                               }
//                             >
//                               <FavoriteIcon />
//                             </IconButton>
//                             <div>{comment.likes.length} likes</div>
//                           </div>

//                           <div
//                             style={{
//                               display: "flex",
//                               flexDirection: "column",
//                             }}
//                           >
//                             <div style={{ display: "flex" }}>
//                               <Typography
//                                 style={{
//                                   marginLeft: "10px",
//                                   color: "#919EAB",
//                                 }}
//                               >
//                                 {moment(comment.createdAt).fromNow()}
//                               </Typography>
//                               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                               <Typography
//                                 style={{ color: "#919EAB" }}
//                                 onClick={() => {
//                                   replyRef && replyRef.current.focus();
//                                   setNewComment(
//                                     `@${comment.commentBy.firstName} ${comment.commentBy.lastName}_`
//                                   );
//                                   setFeedId(comment._id);
//                                 }}
//                               >
//                                 Reply
//                               </Typography>
//                             </div>
//                             <br />
//                             {showReply[index] === false && (
//                               <div>
//                                 <Typography
//                                   sx={{
//                                     justifyContent: "center",
//                                     ml: "10px",
//                                   }}
//                                   onClick={() => showSpecificReplies(index)}
//                                 >
                               
//                                   {comment.repliedComments.length > 0 &&
//                                     `- ${comment.repliedComments.length}Replies`}
//                                 </Typography>
//                               </div>
//                             )}

//                             {showReply[index] === true && (
//                               <div
//                                 style={{
//                                   display: "flex",
//                                   flexDirection: "column",
//                                   lineHeight: "15px",
//                                 }}
//                               >
//                                 {comment.repliedComments.map(
//                                   (rcom: any) => {
//                                     return (
//                                       <>
//                                         <div style={{ display: "flex" }}>
//                                           <div>
//                                             <Avatar
//                                               src={
//                                                 rcom.commentedBy
//                                                   .profilePicture
//                                               }
//                                             />
//                                           </div>
//                                           <div
//                                             style={{
//                                               display: "flex",
//                                               flexDirection: "column",
//                                             }}
//                                           >
//                                             <div
//                                               style={{ display: "flex" }}
//                                             >
//                                               <Typography
//                                                 style={{
//                                                   color: "#212B36",
//                                                   fontWeight: "600",
//                                                   minWidth: "100px",
//                                                 }}
//                                               >
//                                                 {rcom.commentedBy.firstName}
//                                                 &nbsp;&nbsp;
//                                                 {rcom.commentedBy.lastName}
//                                               </Typography>
//                                               &nbsp;&nbsp;&nbsp;
//                                               <Typography
//                                                 style={{
//                                                   color: "#919EAB",
//                                                   minWidth: "150px",
//                                                 }}
//                                               >
//                                                 {rcom.comment}
//                                               </Typography>
//                                               <IconButton
//                                                 style={{
//                                                   color: "#919EAB",
//                                                   float: "right",
//                                                 }}
//                                               >
//                                                 <FavoriteIcon />
//                                               </IconButton>
//                                             </div>

//                                             <div>
//                                               <Typography
//                                                 style={{
//                                                   marginLeft: "0px",
//                                                   color: "#919EAB",
//                                                 }}
//                                               >
//                                                 {moment(
//                                                   feed.updatedAt
//                                                 ).fromNow()}
//                                               </Typography>
//                                             </div>
//                                           </div>
//                                         </div>

//                                         <br />
//                                       </>
//                                     );
//                                   }
//                                 )}
//                               </div>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     </>
//                   );
//                 })
//               : null;
//           })}
//         </Grid>
//         <IconButton style={{ color: "black" }}>
//           {post.like && Object.keys(post.like).length > 0 ? (
//             <FavoriteIcon style={{ color: "red" }} />
//           ) : (
//             <FavoriteBorderIcon />
//           )}
//         </IconButton>
//         <Typography onClick={() => setOpenLikes(true)}>
//           {post.like && Object.keys(post.like).length}&nbsp; likes
//         </Typography>
//         <IconButton
//           style={{ float: "right", marginTop: "-60px", color: "black" }}
//         >
//           <BookmarkBorderIcon />
//         </IconButton>
//         <Divider></Divider>
//         &nbsp;&nbsp;&nbsp;&nbsp;
//         <div className="picker-container">
//           <TextField
//             id="standard-basic"
//             inputRef={replyRef}
//             placeholder="Add a comment"
//             variant="standard"
//             style={{ width: "420px", marginLeft: "49px" }}
//             className="input-style"
//             value={newComment}
//             onChange={(e) => setNewComment(e.target.value)}
//             InputProps={{
//               disableUnderline: true,
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton
//                     edge="end"
//                     color="primary"
//                     style={{ fontSize: "18px" }}
//                     onClick={() => postCommentReply()}
//                   >
//                     post
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />
//           <img
//             className="emoji-icon"
//             style={{ right: "459px" }}
//             src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg"
//             onClick={() => setCommentPicker((val) => !val)}
//           />
//           {commentPicker && (
//             <Picker
//               pickerStyle={{ width: "100%", marginTop: "-80%" }}
//               onEmojiClick={onEmojiClick}
//             />
//           )}
//         </div>
//       </div>
//       <Likemodal openLikes={openLikes} setOpenLikes={setOpenLikes} post={post.like} />
//     </Box>
//   </Modal>
//   )
// }

// export default Commentmodal