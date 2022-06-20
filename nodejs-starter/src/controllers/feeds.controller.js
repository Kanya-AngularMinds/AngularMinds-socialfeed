const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user.model.js')
const FeedSchema = require('../models/feed.model')
const {
    feedService
} = require('../services');

// --------------------------------createFeed-------------------------------------------//
const createFeed = catchAsync(async (req, res) => {
    const feed = await (await feedService.createFeed({
        caption: req.body.caption,
        CreatedBy: req.user._id , ...req.body,
        photos: req.files.map(item => (
            { fileName: item.filename, path: item.path }
        )),
    }))
    .populate({
       path:"CreatedBy",
       select:"_id name firstName lastName"
    })
    res.status(httpStatus.CREATED).send(feed);
});
// --------------------------------createFeedEnds---------------------------------------//


// --------------------------------CommentFeed------------------------------------------//
const CommentFeed = catchAsync(async (req, res) => {
    const commentFeed = await (await feedService.CommentFeedById(
        req.params.feedId,
        {
            commentBy: req.user._id, ...req.body
        }
    ))
        .populate({
            path: "comment.commentBy",
            select: "_id name  profilePicture"
        });

    res.send(commentFeed);
})
// --------------------------------CommentFeedEnds--------------------------------------//


// --------------------------------LikeFeed---------------------------------------------//
const LikeFeed = catchAsync(async (req, res) => {
    const likeFeed = await (await feedService.LikeFeedById(
        req.params.feedId,
        {
            likedBy: req.user._id, ...req.body
        }
    ))
    res.send(likeFeed);
})
// --------------------------------LikeFeedEnds-----------------------------------------//




// --------------------------------BookmarkFeed-----------------------------------------//
const BookmarkFeed = catchAsync(async (req, res) => {
     console.log(req.params.feedId)
    const bookmarkFeed = await (await feedService.Bookmark(req.params.feedId, req.user._id))
    // // .populate("_id ");   
    console.log(bookmarkFeed)
    res.send(bookmarkFeed);
})
// --------------------------------BookmarkFeedEnds-------------------------------------//



// --------------------------------getAllFeeds------------------------------------------//
const getFeeds = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['caption']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await feedService.queryFeeds(filter, {
        ...options,
        populate: [{
            path: "comment.commentBy",
            select: "_id name firstName lastName email profilePicture"
            },
        {
            path:"CreatedBy",
            select: "_id name firstName lastName "
        },
    {
         path:"like.likedBy",
         select: "_id firstName lastName profilePicture"
    }]
    });
    res.send(result);
});
// --------------------------------getAllFeedsEnds---------------------------------------//


// --------------------------------getSingleFeed-----------------------------------------//
const getFeed = catchAsync(async (req, res) => {
    const feed = await (await feedService.getFeedById(req.params.feedId))
        .populate("_id caption");
    if (!feed) {
        throw new ApiError(httpStatus.NOT_FOUND, 'feed not found');
    }
    res.send(req.feed);
});
// --------------------------------getSingleFeedEnds------------------------------------//

// --------------------------------updateFeed-------------------------------------------//
const updateFeed = catchAsync(async (req, res) => {
    const feed = await (await feedService.updateFeedById(req.params.userId, req.body))
        .populate("_id caption");
    res.send(feed);
});
// --------------------------------updateFeedEnds---------------------------------------//


// --------------------------------deleteFeed-------------------------------------------//
const deleteFeed = catchAsync(async (req, res) => {
    const deletedRes = await feedService.deleteFeedById(req.params.feedId)
    res.send({ deleted: deletedRes.deleted, message: "Feed has been deleted successfully..." });
});

// --------------------------------deleteFeedEnds--------------------------------------//


// --------------------------------BookmarkFeed----------------------------------------//
const RepliedComments = catchAsync(async (req, res) => {
    const { _id } = req.user
    const user = await User.findById({ _id })

    const { commentId, feedId } = req.params
    const feed = await feedService.getFeedById(req.params.feedId)
    // console.log(feed)

    const commentsData = feed.comment.filter((one) => JSON.stringify(one._id) === JSON.stringify(commentId))
    const a = commentsData[0].repliedComments.push({
        commentedBy: user,
        comment: req.body.comment,
    })

    await FeedSchema.findByIdAndUpdate({ _id: feedId }, feed)
    res.status(200).json({
        message: "Successfull"
    })



    // // console.log(req.params.feedId)
    // const bookmarkFeed = await (await feedService.Bookmark(req.params.feedId, req.user._id))
    // // // .populate("_id ");   
    // console.log(bookmarkFeed)
    // res.send(bookmarkFeed);
})
// ---------------------------------------BookmarkFeedEnds-----------------------------------------//

// -----------------------------------------LikeComment-------------------------------------------//
const LikeComment = catchAsync(async (req, res) => {
    try {
        const feed = await feedService.getFeedById(req.params.feedId)
        const commentData = feed.comment.filter(one => JSON.stringify(one._id) === JSON.stringify(req.params.commentId))
        if (commentData[0].likes.length === 0) {
            commentData[0].likes.push(req.user._id)
            await FeedSchema.findByIdAndUpdate({ _id: req.params.feedId }, feed)
            res.status(200).json({
                message: "Successfull"
            })
        }
        else {
            console.log('first')
            if (commentData[0].likes.includes(req.user._id)) {
                console.log('first1')
                const data = commentData[0].likes.filter(one => JSON.stringify(one) !== JSON.stringify(req.user._id))
                commentData[0].likes = data
                await FeedSchema.findByIdAndUpdate({ _id: req.params.feedId }, feed)
                res.status(200).json({
                    message: "Successfull"
                })
            }
        }
    }
    catch (err) {
        console.log(err.message)
    }
})
//------------------------------------------LikeCommentEnds-----------------------------------------//


module.exports = {
    createFeed,
    getFeeds,
    getFeed,
    updateFeed,
    deleteFeed,
    LikeFeed,
    BookmarkFeed,
    CommentFeed,
    RepliedComments,
    LikeComment
};
