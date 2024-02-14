import React, { useState, useEffect, useRef, memo } from "react";
import "./home.scss";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SimpleImageSlider from "react-simple-image-slider";
import { patch } from "../../utils/http/httpMethods";
import Divider from "@mui/material/Divider";
import moment from "moment";
import "moment-timezone";
import CloseIcon from "@mui/icons-material/Close";

import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  Grid,
  IconButton,
  InputAdornment,
  Modal,
  Skeleton,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { get, post, put } from "../../utils/http/httpMethods";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Picker from "emoji-picker-react";
import Likemodal from "../likemodal/likemodal";

function Login() {
  const [loading, setLoading] = useState(false);
  const [allFeeds, setAllFeeds] = useState([]);
  const [inputStr, setInputStr] = useState("");
  const [showPicker, setShowPicker] = useState([] as any);
  const [images, setImages] = useState([]);
  const [openComment, setOpenComment] = useState(false);
  const [ind, setInd] = useState(Number);
  const [allUsers, setAllUsers] = useState([]);
  const [bookmark, setBookmark] = useState(false);
  const [commentPicker, setCommentPicker] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [feedId, setFeedId] = useState("");
  const [post, setPost] = useState([] as any);
  const userObj = JSON.parse(localStorage.getItem("currentUser") as any);
  const [showReply, setShowReply] = useState<boolean[]>([]);
  const [openLikes, setOpenLikes] = useState(false);

  const replyRef = useRef("" as any);

  /*******************get All posts & filpreview array for slider & get all user*********************************/
  const getData = async () => {
    get("http://localhost:8080/feeds?limit=100").then((response: any) => {
      setAllFeeds(response.results);
      setShowPicker(Array(response.results.length).fill(false));
      let arrayImgs = response.results.map((feed: any) => {
        return feed.photos.map((photo: any) => {
          return `http://192.168.0.87:8080/${photo.fileName}`;
        });
      });
      setImages(arrayImgs);
      get("http://localhost:8080/users?limit=100").then((response: any) => {
        setAllUsers(response.results);
      });
    });
  };

  /*******************************concat emoji to comment********************************************************/
  const onEmojiClick = (event: any, emojiObject: any) => {
    setNewComment((prevInput) => prevInput + emojiObject.emoji);
    setInputStr((prevInput) => prevInput + emojiObject.emoji);
    setShowPicker(false);
  };

  /**********************************Add Bookmark***************************************/

  const addBookMark = (id: any) => {
    patch(`http://localhost:8080/feeds/bookmark/${id}`).then((response) => {
      getData();
    });
  };

  /**********************************Like post******************************************/
  const handleLike = (id: any) => {
    patch(`http://localhost:8080/feeds/like/${id}`).then((response: any) => {
      getData();
    });
  };

  /**********************************post comment******************************************/
  const postComment = (id: any) => {
    patch(`http://localhost:8080/feeds/comments/${id}`, {
      comment: inputStr,
    }).then((response: any) => {
      getData();
      setInputStr("");
      setNewComment("");
    });
  };

  /*************************************like to comment***************************************************/
  const likeComment = (commentId: any, feedId: any) => {
    patch(
      `http://localhost:8080/feeds/likeComment/${feedId}/${commentId}`
    ).then((response: any) => {
      getData();
    });
  };

  /*************************************Reply to comment***************************************************/
  const postCommentReply = () => {
    let trimmedComment = newComment.split("_").pop();

    allFeeds.map((feed: any, index: number) => {
      if (ind === index) {
        patch(
          `http://localhost:8080/feeds/repliedComments/${feed._id}/${feedId}`,
          { comment: trimmedComment }
        ).then((response) => {
          getData();
        });
      }
    });
    setNewComment("");
  };

  /************************************* open specific index emoji picker***********************************/

  const handlePicker = (id: number) => {
    let newArr = [...showPicker];
    if (newArr[id] === true) {
      newArr[id] = false;
      setShowPicker(newArr);
    } else {
      newArr[id] = true;
      setShowPicker(newArr);
    }
  };

  /*************************************Boolean array of posts length***********************************/
  const displayReplies = (index: number) => {
    let res = allFeeds.map((rs: any) => {
      setShowReply(Array(allFeeds[index]["comment"]["length"]).fill(false));
    });
  };

  /*************************************show reply of comment***********************************/
  const showSpecificReplies = (index: number) => {
    let newArr = [...showReply];
    newArr[index] = true;
    setShowReply(newArr);
  };

  /*************************************hide reply of comment***********************************/
  const hideReply = (index: number) => {
    let newArr = [...showReply];
    newArr[index] = false;
    setShowReply(newArr);
  };

  /*************Call of getData****************/
  useEffect(() => {
    getData();
  }, []);

  return (
    <Container maxWidth="sm" style={{ overflowY: "hidden" }}>
      {allFeeds &&
        allFeeds.map((feed: any, index: any) => {
          return (
            <Box
              style={{
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                marginTop: "30px",
                overflow: "hidden",
              }}
              key={index}
            >
              <Card
                sx={{
                  borderRadius: 5,

                  pl: 3,
                  pr: 3,
                  width: 608,
                  // flex:none,
                  height: "auto",
                }}
                className="card-container"
              >
                {allUsers &&
                  allUsers.map(
                    (user: any, index: number) =>
                      user._id === feed.CreatedBy._id && (
                        <CardHeader
                          key={index}
                          style={{
                            margin: "auto",
                          }}
                          avatar={
                            loading ? (
                              <Skeleton
                                animation="wave"
                                variant="circular"
                                width={40}
                                height={80}
                              />
                            ) : (
                              <Avatar
                                sx={{
                                  height: "60px",
                                  width: "60px",
                                  justifyContent: "Center",
                                }}
                              >
                                <img src={user.profilePicture} />
                                {feed.userName}
                              </Avatar>
                            )
                          }
                          action={
                            loading ? null : (
                              <IconButton
                                aria-label="settings"
                                id="basic-button"
                                // aria-controls={open ? "basic-menu" : undefined}
                                aria-haspopup="true"
                                // aria-expanded={open ? "true" : undefined}
                                // onClick={openEditPost}
                              >
                                <MoreVertIcon />
                              </IconButton>
                            )
                          }
                          title={
                            loading ? (
                              <Skeleton
                                animation="wave"
                                height={10}
                                width="80%"
                                style={{ marginBottom: 6 }}
                              />
                            ) : (
                              <Typography
                                style={{ color: "#212B36", fontWeight: 600 }}
                              >
                                {user.firstName}&nbsp;&nbsp;{user.lastName}
                              </Typography>
                            )
                          }
                          subheader={
                            <Typography
                              style={{
                                textOverflow: "ellipsis",
                                width: "450px",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                              }}
                            >
                              {feed.caption}
                            </Typography>
                          }
                        />
                      )
                  )}

                {loading ? (
                  <Skeleton
                    sx={{ height: 190 }}
                    animation="wave"
                    variant="rectangular"
                  />
                ) : feed.photos.length > 1 ? (
                  <SimpleImageSlider
                    width={608}
                    height={560}
                    images={images[index]}
                    showBullets={true}
                    showNavs={true}
                  />
                ) : (
                  feed.photos.map((photo: any, index: any) => {
                    return (
                      <CardMedia
                        component="img"
                        key={index}
                        //  sx={{
                        //    height: 400,
                        //    width: 550,
                        //    maxHeight: { xs: 333, md: 467 },
                        //    maxWidth: { xs: 350, md: 600 },
                        //  }}
                        height="400"
                        image={photo.fileName}
                        alt="Paella dish"
                      />
                    );
                  })
                )}
                {/* {console.log("===============================",feed.like.includes(feed.like.find((el: any) => el.likedBy._id === userObj._id)))} */}

                <CardActions>
                  <IconButton
                    aria-label="add to favorites"
                    color={
                      feed.like.includes(
                        feed.like.find(
                          (el: any) => el.likedBy._id === userObj._id
                        )
                      )
                        ? "error"
                        : "default"
                    }
                    // sx={{  color: feed.like.includes(
                    //   feed.like.find((el: any) => el.likedBy._id === userObj._id)
                    // )
                    //   ? "red"
                    //   : "gray"}}
                    onClick={() => handleLike(feed._id)}
                  >
                    <FavoriteIcon sx={{ fontSize: 32 }} />
                  </IconButton>

                  <IconButton
                    onClick={() => {
                      setOpenComment(true);
                      setInd(index);
                      setPost(feed);
                      displayReplies(index);
                    }}
                  >
                    <ChatBubbleOutlineIcon
                      sx={{ fontSize: 32, color: "black" }}
                    />
                  </IconButton>
                  <Grid container justifyContent="flex-end">
                    <IconButton
                      onClick={() => {
                        addBookMark(feed._id);
                        if (bookmark === true) {
                          setBookmark(false);
                        } else {
                          setBookmark(true);
                        }
                      }}
                    >
                      {bookmark === true ? (
                        <BookmarkIcon sx={{ color: "black", fontSize: 32 }} />
                      ) : (
                        <BookmarkBorderIcon
                          sx={{ fontSize: 32, color: "black" }}
                        />
                      )}
                    </IconButton>
                  </Grid>

                  {/* <h4>{feed.likes.length}</h4> */}
                </CardActions>
                <Typography sx={{ ml: "15px" }}>
                  {feed.like.length > 0 && `${feed.like.length} likes`}
                </Typography>
                <CardContent>
                  <Grid
                    container
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      marginTop: "-20px",
                    }}
                  >
                    <Grid item style={{ display: "flex" }}>
                      <p style={{ color: "#212B36", fontWeight: 600 }}>
                        {feed.CreatedBy.firstName} {feed.CreatedBy.lastName}
                      </p>
                      &nbsp;&nbsp;<p>{feed.caption}</p>
                    </Grid>
                    <Grid
                      item
                      style={{
                        color: "#919EAB",
                        fontWeight: 400,
                        fontSize: "16px",
                      }}
                      onClick={() => {
                        setOpenComment(true);
                        setInd(index);
                      }}
                    >
                      {feed.comment.length >= 1
                        ? `view all ${feed.comment.length} comments`
                        : "No comments yet"}
                    </Grid>
                    <Grid
                      item
                      style={{
                        color: "#637381",
                        marginTop: "10px",
                        fontSize: "12px",
                        fontWeight: 400,
                      }}
                    >
                      {moment(feed.createdAt).fromNow()}
                    </Grid>
                    <Grid container></Grid>
                  </Grid>
                </CardContent>
                <Divider></Divider>
                <div className="picker-container">
                  <TextField
                    id="standard-basic"
                    placeholder="Add your comment...."
                    value={inputStr}
                    variant="standard"
                    style={{ width: "450px", marginLeft: "50px" }}
                    className="input-style"
                    // value={inputStr}
                    onChange={(e) => setInputStr(e.target.value)}
                    InputProps={{
                      disableUnderline: true,
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            color="primary"
                            style={{ fontSize: "18px" }}
                            onClick={() => postComment(feed._id)}
                          >
                            post
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <img
                    className="emoji-icon"
                    src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg"
                    onClick={() => handlePicker(index)}
                  />
                  {showPicker[index] && (
                    <Picker
                      pickerStyle={{ width: "60%", marginTop: "-360px" }}
                      onEmojiClick={onEmojiClick}
                    />
                  )}
                </div>
                <br />
              </Card>
            </Box>
          );
        })}

      {/************************************************Comment pop up************************************************* */}

      <Modal
        open={openComment}
        style={{
          backgroundColor: "transparent",
          padding: "80px",
          height: "auto",
          minWidth: "400px",
        }}
        disableAutoFocus={true}
        onClose={() => setOpenComment(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            width: "990px",
            height: "650px",
            display: "grid",
            minWidth: "300",
            gridTemplateColumns: "1fr 1fr",
            justifyContent: "center",
            margin: "auto",
            alignItems: "center",
            background: "#fff",
          }}
        >
          <div>
            {allFeeds.map((feed: any, i) => {
              return (
                i === ind &&
                (feed["photos"]["length"] > 1 ? (
                  <SimpleImageSlider
                    width={495}
                    height={650}
                    images={images[i]}
                    showBullets={true}
                    showNavs={true}
                  />
                ) : (
                  feed["photos"]["map"]((photo: any, i: any) => {
                    return (
                      <img
                        src={photo.fileName}
                        alt="img"
                        height="650px"
                        width="495px"
                      />
                    );
                  })
                ))
              );
            })}
          </div>
          <div>
            <CloseIcon
              style={{ position: "relative", right: "-520px" }}
              onClick={() => setOpenComment(false)}
            />
            <Grid
              item
              xs={12}
              style={{ display: "flex", padding: "10px", marginTop: "-20px" }}
            >
              {allUsers.map((user: any, i: any) => {
                return allFeeds.map((feed: any, i) => {
                  return (
                    i == ind &&
                    feed.CreatedBy._id === user._id && (
                      <>
                        <Avatar
                          src={user.profilePicture}
                          style={{
                            marginTop: "10px",
                            height: "60px",
                            width: "60px",
                          }}
                        />
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            padding: "10px",
                            width: "200%",
                            lineHeight: "2px",
                          }}
                        >
                          <Typography>
                            {user.firstName}&nbsp;&nbsp;{user.lastName}
                          </Typography>
                          <Typography style={{ color: "#637381" }}>
                            International space station
                          </Typography>
                          <Typography
                            style={{
                              textOverflow: "ellipsis",
                              width: "250px",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                            }}
                          >
                            {feed.caption}
                          </Typography>
                        </div>
                        <Grid container justifyContent="flex-end">
                          <Typography
                            style={{ marginTop: "10px", width: "100%" }}
                          >
                            {moment(feed.createdAt).fromNow()}
                          </Typography>
                        </Grid>
                      </>
                    )
                  );
                });
              })}
              <Divider></Divider>
            </Grid>
            <Grid item xs={12} style={{ overflowY: "scroll", height: "390px" }}>
              {/* map comments array display profile pic user name comment and time and reply and likes and scrollbar */}
              {allFeeds.map((feed: any, index: any) => {
                return index === ind
                  ? feed.comment.map((comment: any, index: any) => {
                      return (
                        <>
                          <div style={{ display: "flex" }}>
                            <div
                              style={{
                                display: "flex",
                                padding: "10px",
                                cursor: "pointer",
                              }}
                              onClick={() => hideReply(index)}
                            >
                              <Avatar style={{ height: "55px", width: "55px" }}>
                                <img
                                  src={comment.commentBy?.profilePicture}
                                  alt="img"
                                />
                              </Avatar>
                            </div>

                            <div
                              style={{
                                display: "flex",
                                padding: "10px",
                                flexDirection: "column",
                              }}
                            >
                              <div
                                style={{ display: "flex", cursor: "pointer" }}
                                onClick={() => hideReply(index)}
                              >
                                <Typography style={{ marginLeft: "10px" }}>
                                  {comment.commentBy?.firstName}&nbsp;&nbsp;
                                  {comment.commentBy?.lastName}
                                </Typography>
                                <Typography
                                  style={{
                                    marginLeft: "10px",
                                    color: "#919EAB",
                                  }}
                                >
                                  {comment.comment}
                                </Typography>
                                <IconButton
                                  color={
                                    comment.likes.includes(userObj._id)
                                      ? "error"
                                      : "default"
                                  }
                                  style={{ justifyContent: "flex-end" }}
                                  onClick={() =>
                                    likeComment(comment._id, feed._id)
                                  }
                                >
                                  <FavoriteIcon />
                                </IconButton>
                                <div>{comment.likes.length} likes</div>
                              </div>

                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                <div style={{ display: "flex" }}>
                                  <Typography
                                    style={{
                                      marginLeft: "10px",
                                      color: "#919EAB",
                                    }}
                                  >
                                    {moment(comment.createdAt).fromNow()}
                                  </Typography>
                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  <Typography
                                    style={{ color: "#919EAB" }}
                                    onClick={() => {
                                      replyRef && replyRef.current.focus();
                                      setNewComment(
                                        `@${comment.commentBy.firstName} ${comment.commentBy.lastName}_`
                                      );
                                      setFeedId(comment._id);
                                    }}
                                  >
                                    Reply
                                  </Typography>
                                </div>
                                <br />
                                {showReply[index] === false && (
                                  <div>
                                    <Typography
                                      sx={{
                                        justifyContent: "center",
                                        ml: "10px",
                                      }}
                                      onClick={() => showSpecificReplies(index)}
                                    >
                                      {/* {comment.repliedComments ? comment.repliedComments.length > 0  && `- ${comment.repliedComments.length}Replies`: console.log(null)}   */}
                                      {comment.repliedComments.length > 0 &&
                                        `- ${comment.repliedComments.length}Replies`}
                                    </Typography>
                                  </div>
                                )}

                                {showReply[index] === true && (
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      lineHeight: "15px",
                                    }}
                                  >
                                    {comment.repliedComments.map(
                                      (rcom: any) => {
                                        return (
                                          <>
                                            <div style={{ display: "flex" }}>
                                              <div>
                                                <Avatar
                                                  src={
                                                    rcom.commentedBy
                                                      .profilePicture
                                                  }
                                                />
                                              </div>
                                              <div
                                                style={{
                                                  display: "flex",
                                                  flexDirection: "column",
                                                }}
                                              >
                                                <div
                                                  style={{ display: "flex" }}
                                                >
                                                  <Typography
                                                    style={{
                                                      color: "#212B36",
                                                      fontWeight: "600",
                                                      minWidth: "100px",
                                                    }}
                                                  >
                                                    {rcom.commentedBy.firstName}
                                                    &nbsp;&nbsp;
                                                    {rcom.commentedBy.lastName}
                                                  </Typography>
                                                  &nbsp;&nbsp;&nbsp;
                                                  <Typography
                                                    style={{
                                                      color: "#919EAB",
                                                      minWidth: "150px",
                                                    }}
                                                  >
                                                    {rcom.comment}
                                                  </Typography>
                                                  <IconButton
                                                    style={{
                                                      color: "#919EAB",
                                                      float: "right",
                                                    }}
                                                  >
                                                    <FavoriteIcon />
                                                  </IconButton>
                                                </div>

                                                <div>
                                                  <Typography
                                                    style={{
                                                      marginLeft: "0px",
                                                      color: "#919EAB",
                                                    }}
                                                  >
                                                    {moment(
                                                      feed.updatedAt
                                                    ).fromNow()}
                                                  </Typography>
                                                </div>
                                              </div>
                                            </div>

                                            <br />
                                          </>
                                        );
                                      }
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })
                  : null;
              })}
            </Grid>
            <IconButton style={{ color: "black" }}>
              {post.like && Object.keys(post.like).length > 0 ? (
                <FavoriteIcon style={{ color: "red" }} />
              ) : (
                <FavoriteBorderIcon />
              )}
            </IconButton>
            <Typography onClick={() => setOpenLikes(true)}>
              {post.like && Object.keys(post.like).length}&nbsp; likes
            </Typography>
            <IconButton
              style={{ float: "right", marginTop: "-60px", color: "black" }}
            >
              <BookmarkBorderIcon />
            </IconButton>
            <Divider></Divider>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <div className="picker-container">
              <TextField
                id="standard-basic"
                inputRef={replyRef}
                placeholder="Add a comment"
                variant="standard"
                style={{ width: "420px", marginLeft: "49px" }}
                className="input-style"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                InputProps={{
                  disableUnderline: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        color="primary"
                        style={{ fontSize: "18px" }}
                        onClick={() => postCommentReply()}
                      >
                        post
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <img
                className="emoji-icon"
                style={{ right: "459px" }}
                src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg"
                onClick={() => setCommentPicker((val) => !val)}
              />
              {commentPicker && (
                <Picker
                  pickerStyle={{ width: "100%", marginTop: "-80%" }}
                  onEmojiClick={onEmojiClick}
                />
              )}
            </div>
          </div>
        </Box>
      </Modal>
      <Likemodal
        openLikes={openLikes}
        setOpenLikes={setOpenLikes}
        post={post.like}
      />
    </Container>
  );
}
export default React.memo(Login);
