const httpStatus = require('http-status');
const {
    Feed,
    Organization
} = require('../models');
const User = require('../models/user.model');
const ApiError = require('../utils/ApiError');

/**
 * Create an organization
 * @param {Object} orgBody
 * @returns {Promise<Feed>}
 */

/**
 * Create a Feed
 * @param {Object} userBody
 * @returns {Promise<Feed>}
 */
const createFeed = async (feedBody) => {
    return Feed.create(feedBody);
};

const CommentFeedById = async (commId, commentData) => {
    const feed = await Feed.findById(commId)
    if (!feed) { throw new ApiError(httpStatus.BAD_REQUEST, 'Post not found'); }

    feed.comment.push(commentData);

    const commSaved = await feed.save();
    if (!commSaved) { throw new ApiError(httpStatus.BAD_REQUEST, 'Something Went Wrong'); }
    console.log(commSaved);
    return commSaved
}



const LikeFeedById = async (likeId, likeData) => {
    const feed = await Feed.findById(likeId)
    if (!feed) { throw new ApiError(httpStatus.BAD_REQUEST, 'Post not found'); }

    let pos = -1;
    feed.like.map((data, index) => JSON.stringify(data.likedBy) === JSON.stringify(likeData.likedBy) ? pos = index : pos = -1)
    if (pos !== -1 && JSON.stringify(feed.like[pos].likedBy) === JSON.stringify(likeData.likedBy))
        feed.like.splice(pos, 1)
    else
        feed.like.push(likeData);

    const likeSaved = await feed.save();
    if (!likeSaved) { throw new ApiError(httpStatus.BAD_REQUEST, 'Something Went Wrong'); }
    return likeSaved
}


//------------------------------------------------BookmarkService----------------------------//
const Bookmark = async (FeedId, UserId) => {
    const user = await User.findById(UserId);
    if (!user) { throw new ApiError(httpStatus.BAD_REQUEST, 'Post not found'); }

    let pos = -1;

    user.bookmark.length > 0 && user.bookmark.map((data, index) => JSON.stringify(data.feedId) === JSON.stringify(FeedId) ? pos = index : pos = -1)
    console.log(pos)
    if (pos !== -1 && JSON.stringify(user.bookmark[pos].feedId) === JSON.stringify(FeedId))
        user.bookmark.splice(pos, 1)
    else
        user.bookmark.push({ feedId: FeedId });
    const bookmarkSaved = await user.save();
    if (!bookmarkSaved) { throw new ApiError(httpStatus.BAD_REQUEST, 'Something Went Wrong'); }
    return bookmarkSaved

}
//-------------------------------------------------------------------------------------------//

/**
 * Query for feeds
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryFeeds = async (filter, options) => {
    const feeds = await Feed.paginate(filter, options);
    return feeds;
};

/**
 * Get Feed by id
 * @param {ObjectId} id
 * @returns {Promise<Feed>}
 */
const getFeedById = async (id) => {
    return Feed.findById(id);
};

/**
 * Get Feed by email
 * @param {string} email
 * @returns {Promise<Feed>}
 */
// const getUserByEmail = async (email) => {
//     return Feed.findOne({
//         email
//     });
// };

/**
 * Update Feed by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<Feed>}
 */
const updateFeedById = async (userId, updateBody) => {
    const Feed = await getFeedById(userId);
    if (!Feed) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Feed not found');
    }
    Object.assign(Feed, updateBody);
    await Feed.save();
    return Feed;
};

/**
 * Update organization by id
 * @param {ObjectId} orgId
 * @param {Object} updateBody
 * @returns {Promise<Organization>}
 */
const updateOrgById = async (orgId, updateBody) => {
    const org = await Organization.findById(orgId);
    if (!org) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Organization not found');
    }
    if (updateBody.email && (await Organization.isEmailTaken(updateBody.email, orgId))) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Organization already exists with this email');
    }
    Object.assign(org, updateBody);
    await org.save();
    return org;
};

/**
 * Delete Feed by id
 * @param {ObjectId} userId
 * @returns {Promise<Feed>}
 */
const deleteFeedById = async (feedId) => {
    const Feed = await getFeedById(feedId);
    if (!Feed) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Feed not found');
    }
    await Feed.delete();
    return Feed;
};

module.exports = {
    createFeed,
    queryFeeds,
    getFeedById,
    // getUserByEmail,
    updateFeedById,
    CommentFeedById,
    LikeFeedById,
    Bookmark,
    deleteFeedById,
};
