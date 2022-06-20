const Joi = require('joi');
const {objectId } = require('./custom.validation');

const createFeed = {
    body: Joi.object().keys({
        caption: Joi.string(),
        photos: Joi.array(),
        createdBy: Joi.string()
    }),
};

const getFeeds = {
    query: Joi.object().keys({
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    }),
};

const commentFeed = {
    body: Joi.object().keys({
        comment: Joi.string().required()
    }),
}

// const getFeed = {
//     params: Joi.object().keys({
//         feedId: Joi.string().custom(objectId),
//     }),
// };

// const updateFeed = {
//     params: Joi.object().keys({
//         feedId: Joi.required().custom(objectId),
//     }),
//     body: Joi.object()
//         .keys({
//             caption: Joi.string(),
//             photos: Joi.string(),
//         })
//         .min(1),
// };


const deleteFeed = {
    params: Joi.object().keys({
        feedId: Joi.string().custom(objectId),
    }),
};

module.exports = {
    createFeed,
    getFeeds,
    commentFeed,
    // getFeed,
    // updateFeed,
    // // updateOrg,
    deleteFeed
};
