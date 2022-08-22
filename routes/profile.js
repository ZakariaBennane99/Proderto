const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth") 
const User = require("../models/User")
const Post = require("../models/Post")
const { check, validationResult } = require('express-validator')
const mongoose = require('mongoose')
const bcrypt = require("bcrypt")
const multer = require('multer')
const fs = require("fs")
const path = require('path')
const saltRounds = 10


const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, `users_images/${req.user.id}`)
    },
    filename: function (req, file, callback) {
        callback(null, req.header("image-type"))
    }
})

const upload = multer({ storage: storage })

// check if the folder exists
// check if the file exists
const preUpload = async (req, res, next) => {
    // get the user's folder
    const dir = `users_images/${req.user.id}`
    // get the user's image 
    const imgDir = dir + "/" + req.header("image-type")
    // if the folder doesn't exists create it
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir)
        next()
        return
    }
    // if the file exists delete it
    if (fs.existsSync(imgDir)) {
        fs.unlinkSync(imgDir)
        next()
        return
    }
    next()
    return
}

function getExt (id) {
    const usersIds = [
        "62cc6110ffeb3c58cca62437",
        "62cc61bfffeb3c58cca62441",
        "62cc6239ffeb3c58cca6244b",
        "62cc62a6ffeb3c58cca62450",
        "62cc62dcffeb3c58cca62455",
        "62cc6306ffeb3c58cca6245a",
        "62cc6398ffeb3c58cca6245f",
        "62cc63bfffeb3c58cca62464",
        "62cc63efffeb3c58cca62469",
        "62cc646bffeb3c58cca6246e",
        "62cc64a4ffeb3c58cca62473",
        "62cc6571ffeb3c58cca6247d",
        "62cc65a0ffeb3c58cca62482",
        "62cc65f0ffeb3c58cca62487",
    ]
    const ex = usersIds.some(el => el === id) ? ".jfif" : ""
    return ex
}


// @route   GET api/profile/getProfile
// @desc    Get the user's profile
// @access  Private

router.get('/getProfile', auth, async (req, res) => {

    const targetUserId = req.header("user-id")
    const currentUserId = req.user.id 
    console.log(targetUserId)

    function getImgs (avEx, coEx) {
        const imgs = []
        const ex = getExt(targetUserId) 
        const avatar = `users_images/${targetUserId}/Avatar${ex}`
        const cover = `users_images/${targetUserId}/Cover${ex}`
        if (fs.existsSync(avatar)) {
            const bitmap = fs.readFileSync(avatar)
            const base64 =  new Buffer(bitmap).toString('base64')
            imgs.push({
                img: base64,
                ex: avEx
            })
        } else {
            imgs.push(false)
        }
        if (fs.existsSync(cover)) {
            const bitmap = fs.readFileSync(cover)
            const base64 =  new Buffer(bitmap).toString('base64')
            imgs.push({
                img: base64,
                ex: coEx
            })
        } else {
            imgs.push(false)
        }
        return imgs
    }

    try {
        const userProfile = await User.findOne({ _id: targetUserId })
        const userPosts = await Post.find({ user: targetUserId })
        const fullName = userProfile.fName + " " + userProfile.lName
        const imgs = getImgs(userProfile.avatar.extension, userProfile.cover.extension)
        const posts = userPosts.map((post) => {
            return {
                title: post.title,
                id: post._id,
                likes: post.likes.length,
                awards: post.rewards.length,
                comments: post.rewards.length,
                shares: post.comments.length
            }
        }) 
        // if there is a profile
        res.status(200).json({
            fName: fullName,
            avatar: imgs[0],
            cover: imgs[1],
            posts: posts,
            sameUser: targetUserId === currentUserId
        })
        return
    } catch (err) {
        console.log(err.message)
        res.status(500).send("Server Error")
        return
    }
})

// @route   PUT api/profile
// @desc    Update users profile
// @access  Private

router.put("/", auth, async(req, res) => {
    const profileFields = req.body
    console.log(profileFields)
    try {
        if (Object.keys(profileFields).length > 0) {
            // important: you have to inclde the _id if the id in MongoDB is Object
            let userProfile = await User.findOne({ _id: req.user.id })
            if (userProfile) {
                // update
                console.log(userProfile)
                if (profileFields.password) {
                    profileFields.password = await bcrypt.hash(profileFields.password, await bcrypt.genSalt(saltRounds))
                } 
                userProfile = await User.findOneAndUpdate(
                    { _id: req.user.id }, 
                    { $set: profileFields }, 
                    { new: true }
                )
                await userProfile.save()
            }
            res.status(201).json(userProfile)
            return
        } else {
            res.send("Yes")
            return
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
        return
    }

})

// @route   GET api/profile
// @desc    Get all users' profiles.
// @access  Public

router.get("/", async (req, res) => {
    try {
        // is going to find all the profiles of all the users
        // while specifying the user's - associated with the data - name and email 
        const userProfiles = await User.find()
        res.json(userProfiles)
        return
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Server Error")
        return
    }
})


// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public

router.get("/user/:userId", async (req, res) => {
    try {
        const userProfile = await User.findOne({ user: req.params.userId })
        if (!userProfile) return res.status(400).json({ msg: "No profile exists for this user!" })
        res.json(userProfile)
        return
    } catch (err) {
        console.log(err.message)
        // if the userId param have any random data
        if (err.kind === "ObjectId") {
            res.status(400).json({ msg: "No profile exists for this user!" })
            return
        }
        res.status(500).send("Server Error")
        return
    }
})


// @route   POST api/profile/user
// @desc    Get profile by user email
// @access  Public

router.post("/user", [ check("email", "Please include a valid email").isEmail() ], async (req, res) => {
        
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() })
            return
        }

        try {  
            console.log(req.body.email)
            const profile = await User.findOne({ email: req.body.email })
            console.log(profile)
            if (!profile) {
                res.status(401).json({ msg: "This email is not associated with any user" })
                return
            } 
            res.status(201).json(profile)
            return
        } catch (err) {
            console.log(err.message) 
            res.status(500).send("Server Error")
            return
        }

})


// @route   POST api/profile/images
// @desc    add the user's images to the server, 
// then save the URL to MongoDB
// @access  Private

router.post("/images", auth, preUpload, upload.single("file"), async (req, res) => {

    try {
        if (!req.file) {
            res.status(404).send("No file received")
        }
        // find user, then store extension
        const userProfile = await User.findOne({ _id: req.user.id })
        const imgType = req.header("image-type")
        if (imgType === "Avatar") {
            userProfile.avatar = {
                name: "Avatar",
                extension: req.header("image-mime")
            }
        }
        if (imgType === "Cover") {
            userProfile.cover = {
                name: "Cover",
                extension: req.header("image-mime")
            }
        }
        await userProfile.save()
        res.status(202).send("File received")
        return 

    } catch (err) {
        console.log(err.message)
        res.status(500).send("Server Error")
        return
    }

})

// @route   GET api/profile/images
// @desc    get the user's images from the server, 
// then convert to base64 before sending
// @access  Private
router.get("/images", async (req, res) => {

    // id
    const userId = req.header("user-id")
    
    const ex = getExt(userId)

    const imgURI = `users_images/${userId}/Avatar${ex}`

    try {
        // read binary data
        const bitmap = fs.readFileSync(imgURI)
        // convert binary data to base64 encoded string
        const base64 =  new Buffer(bitmap).toString('base64')
        res.status(200).send(base64)
        return
    } catch (err) {
        console.log(err.message)
        res.status(500).send("Server Error")
        return
    }

})


// @route   DELETE api/profile
// @desc    Delete profile, user, and posts
// @access  Private

router.delete("/", auth, async (req, res) => {
    try { 
        // remove user data from MongoDB
        await User.findOneAndDelete({ _id: req.user.id })
        await Post.deleteMany({ user: req.user.id })
        // remove media
        const dir = `users_images/${req.user.id}`
        if (!fs.existsSync(dir)) {
            fs.rmSync(dir, { recursive: true, force: true })
        }
        res.status(200).json({ msg: "User has been deleted!" })
        return
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Server Error")
        return
    }
})


module.exports = router