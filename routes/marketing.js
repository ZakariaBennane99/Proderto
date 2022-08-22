const express = require("express")
const router = express.Router()
const Feedback = require("../models/Feedback")



// @route   POST api/marketing
// @desc    Add a rating with the feedback to the DB
// @access  Public 

router.post('/', async (req, res) => {
    console.log("Fukk")

    const {rating, feedback} = req.body

    try {
        let fb = new Feedback({
            rating: rating,
            feedback: feedback 
        }) 
        fb.save()
        res.status(200).send("done")
        return
    } catch(err) {
        console.error(err.message)
        res.status(500).send("Server Error")
        return 
    }
})



module.exports = router