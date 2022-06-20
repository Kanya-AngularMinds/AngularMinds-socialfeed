const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { private, paginate, softDelete } = require('./plugins');
// const { roles } = require('../config/roles');

const feedSchema = mongoose.Schema(
    {
        caption: {
            type: String,
            required: true,
        },
        photos: {
            type: Array,
            required: true,
        },
        like: [{
            likedBy:
            {
                type: Object,
                ref: "User"
            }
        }],
        comment: [{
            comment: { type: String, },
            commentBy:
            {
                type: mongoose.Types.ObjectId,
                ref: "User"
            },
            repliedComments: [{
                commentedBy: { type: Object },
                comment: { type: String },
                createdAt: { type: Date,default: new Date()}
            }],
            likes: {
                type: Array
            },
            createdAt :{ type:Date , default: new Date()}

        }],

        CreatedBy:
        {
            type: Object,
            ref: "User"
        },
       
    },
    {
        timestamps: true,
    }
);

feedSchema.plugin(softDelete);
feedSchema.plugin(private);
feedSchema.plugin(paginate);

/**
 * @typedef feed
 */
const Feed = mongoose.model('feed', feedSchema);

module.exports = Feed;
