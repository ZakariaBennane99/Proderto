const mongoose = require("mongoose")

const ProfileSchema = mongoose.Schema({
    // we have to link or refer each profile to a user
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    fName: {
        type: String,
        required: true
    },
    lName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
}) 

module.exports = Profile = mongoose.model('profile', ProfileSchema)