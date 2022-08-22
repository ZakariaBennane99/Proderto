require('dotenv').config()
const express = require("express")
const router = express.Router()
const { check, validationResult } = require('express-validator')
const jwt = require("jsonwebtoken")
const User = require("../models/User")
const bcrypt = require("bcrypt")
const Profile = require('../models/Profile')
const saltRounds = 10


// @route   POST api/users
// @desc    Register user
// @access  Public

router.post(
    '/',
    [
        check("fName", "First name is required").not().isEmpty(),
        check("lName", "Last name is required").not().isEmpty(),
        check("email", "Please include a valid email").isEmail(),
        check("password", "Password should be of 6 characters or more").isLength({ min:6 })
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        // destructuring the request 
        const { fName, lName, email, password } = req.body
        try {
            let user = await User.findOne({ email })
            if (user) {
                // 401 is not the right response, but this is just a temporary solution
                res.status(401).json({ errors: [{ msg: "User already exists" }] })
            }            
            /// creating the user ///
            user = new User({
                fName: fName,
                lName: lName, 
                email: email,
                password: password
            }) 
            /// before saving the user to the DB, encrypt the password with bcrypt ///
            user.password = await bcrypt.hash(password, await bcrypt.genSalt(saltRounds))

            /// now save the user and the profile to the DB ///
            await user.save()
            res.status(201).send(user.id)
        } catch(err) {
            console.error(err.message)
            res.status(500).send("Server Error")
        }
})

// @route   POST api/users/verify
// @desc    updare the user's status to verified
// @access  Public

router.post("/verify", async (req, res) => {

    const { userId } = req.body

    try {
        let user = await User.findById(userId)
        if (user) {
            user.verified = true
            user.save()
            res.status(201).send("User has been verified")
        } else {
            res.status(404).send("User not found")
        }
    } catch (err) {
        console.log(err.message)
        res.status(500).send("Server Error")
    }

})


module.exports = router