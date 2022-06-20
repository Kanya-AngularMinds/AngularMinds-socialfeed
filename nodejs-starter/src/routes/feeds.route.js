const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const feedValidation = require('../validations/feed.validation');
const feedController = require('../controllers/feeds.controller');
const upload = require('../middlewares/image.upload');

const router = express.Router();

// Token authentication for all routes defined in this file
router.use(auth());

//----------------------- Routes: ,post_Feed,get All_feeds------------------------//   
router
    .route('/')
    .post(upload, validate(feedValidation.createFeed), feedController.createFeed)
    .get(validate(feedValidation.getFeeds), feedController.getFeeds);


//---------------------------- Routes: ,LikeFeed---------------------------------//   
router
    .route('/like/:feedId')
    .patch(feedController.LikeFeed)



// -----------------------------Bookmarks---------------------------------------//
router
    .route('/bookmark/:feedId')
    .patch(feedController.BookmarkFeed)
//---------------------------------EndBookMarks--------------------------------//


//-------------------------------RepliedComments-----------------------------------------//


router
    .route('/repliedComments/:feedId/:commentId')
    .patch(feedController.RepliedComments)
//-------------------------------RepliedCommentsEnds Here-------------------------------//


router
    .route('/comments/:feedId')
    .patch(validate(feedValidation.commentFeed), feedController.CommentFeed)

//---------------------------- Routes: ,DeleteFeed---------------------------------// 
router
    .route('/delete/:feedId')
    .delete(validate(feedValidation.deleteFeed), feedController.deleteFeed)


//-------------------------------likeComments-----------------------------------------//
router
    .route('/likeComment/:feedId/:commentId')
    .patch(feedController.LikeComment)
//-------------------------------likeCommentsEnds Here-------------------------------//




// // Routes: get one feed, update feed, delete feed
// router
//     .route('/:userId')
//     .get(validate(feedValidation.getFeed), feedController.getFeed)
//     .patch(validate(feedValidation.updateFeed), feedController.updateFeed)
//     .delete(validate(feedValidation.deleteFeed), feedController.deleteFeed);

module.exports = router;

