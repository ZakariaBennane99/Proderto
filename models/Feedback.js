const mongoose = require("mongoose")


const FeedbackSchema = new mongoose.Schema({
    rating: {
        type: Number
    },
    feedback: {
        type: String
    }
}) 


module.exports = Feedback = mongoose.model('feedback', FeedbackSchema) 