const { type } = require("express/lib/response")
const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({
    // we have to link or refer each post to a user
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String
    },
    milestones: [],
    likes: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user"
            },
            fName: {
                type: String,
                required: true
            },
            date: {
                type: String,
                required: true
            }

        }
    ],
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user"
            },
            text: {
                type: String,
                required: true
            },
            fName: {
                type: String,
            },
            date: {
                type: String,
            }
        }
    ],
    rewards: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user"
            },
            fName: {
                type: String,
                required: true
            },
            date: {
                type: String,
                required: true
            },
            reward: {
                type: String,
                required: true
            },
            price: {
                type: Number,
            }
        }
    ],
    date: {
        type: String,
        required: true
    },
    shares: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user"
            },
            fName: {
                type: String,
                required: true
            },
            date: {
                type: String,
                required: true
            }

        }
    ],
    deadline: {
        type: String,
        required: true
    },
    category: {
        type: String,
    }


}) 

module.exports = Post = mongoose.model('post', PostSchema)