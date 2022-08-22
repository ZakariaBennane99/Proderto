require('dotenv').config()
const express = require("express")
const router = express.Router()
const { check, validationResult } = require('express-validator')
const auth = require("../middleware/auth")
const Post = require("../models/Post")
const User = require("../models/User")
const fs = require("fs")


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



// @route   GET api/posts
// @desc    Get all posts of all users
// @access  Public

router.get("/", async (req, res) => {
    try {
        // is going to find all the posts of all the users
        // while specifying the user's - associated with any given post
        const posts = await Post.find().populate('user', '-password')
        res.json(posts)
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Server Error")
    }
})



// @route   GET api/posts/shared/post
// @desc    Get post by id
// @access  Public

router.get("/shared/post", async (req, res) => {
    const postId = req.header("post-id")
    try {
        // is going to find all the posts of all the users
        // while specifying the user's - associated with any given post
        // lean() returns a simple object instead of a long ugly object
        let post = await Post.findOne({ _id: postId }).populate('user', '-password').lean().exec()
        const userId = post.user._id.toString()
        // write a code that checks if it is a real user
        // so that we can add the proper extension instead
        // jfif, the extension for the test data
        const postsIds = [
            "62cc64d8ffeb3c58cca62478",
            "62cc8d788758ca2c97889c56",
            "62cc95768758ca2c978a66e0",
            "62cc9cac8758ca2c978bebeb",
            "62cdbc108758ca2c97c9e7e4",
            "62cdd80c8758ca2c97cfb901",
            "62cdd9cf8758ca2c97d020e5",
            "62cdde458758ca2c97d11e55",
            "62cde14b8758ca2c97d1ca10",
            "62cc814c8758ca2c9785c42d"
        ]
        const ex = postsIds.some(el => el === postId) ? ".jfif" : ""
        const imgURI = `users_images/${userId}/Avatar${ex}`
        const bitmap = fs.readFileSync(imgURI)
        const base64 =  new Buffer(bitmap).toString('base64')
        // inserting avatars of comments
        // console.log("before", post)
        post = {
            ...post,
            likes: post.likes.map(like => {
                const id = like.user.toString()
                const ex = getExt(id) 
                const imgURI = `users_images/${id}/Avatar${ex}`
                if (fs.existsSync(imgURI)) {
                    const bitmap = fs.readFileSync(imgURI)
                    const base64 =  new Buffer(bitmap).toString('base64')
                    return {
                        ...like,
                        avatar: base64
                    }
                } else {
                    return {
                        ...like,
                        avatar: false
                    }
                }
                
                
            }),
            comments: post.comments.map(comment => {
                const id = comment.user.toString()
                const ex = getExt(id) 
                const imgURI = `users_images/${id}/Avatar${ex}`
                if (fs.existsSync(imgURI)) {
                    const bitmap = fs.readFileSync(imgURI)
                    const base64 =  new Buffer(bitmap).toString('base64')
                    return {
                        ...comment,
                        avatar: base64
                    }
                } else {
                    return {
                        ...comment,
                        avatar: false
                    }
                }
            }),
            shares: post.shares.map(share => {
                const id = share.user.toString()
                const ex = getExt(id) 
                const imgURI = `users_images/${id}/Avatar${ex}`
                if (fs.existsSync(imgURI)) {
                    const bitmap = fs.readFileSync(imgURI)
                    const base64 =  new Buffer(bitmap).toString('base64')
                    return {
                        ...share,
                        avatar: base64
                    }
                } else {
                    return {
                        ...share,
                        avatar: false
                    }
                }
            }),
            rewards: post.rewards.map(reward => {
                const id = reward.user.toString()
                const ex = getExt(id) 
                const imgURI = `users_images/${id}/Avatar${ex}`
                if (fs.existsSync(imgURI)) {
                    const bitmap = fs.readFileSync(imgURI)
                    const base64 =  new Buffer(bitmap).toString('base64')
                    return {
                        ...reward,
                        avatar: base64
                    }
                } else {
                    return {
                        ...reward,
                        avatar: false
                    }
                }
            }),
        }

        res.status(200).json({ 
            post: post,
            img: base64
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Server Error")
    }
})



// @route   GET api/posts/post
// @desc    Get post by id
// @access  Private

router.get("/post", auth, async (req, res) => {
    const postId = req.header("post-id")
    try {
        // is going to find all the posts of all the users
        // while specifying the user's - associated with any given post
        // lean() returns a simple object instead of a long ugly object
        let post = await Post.findOne({ _id: postId }).populate('user', '-password').lean().exec()
        const userId = post.user._id.toString()
        // write a code that checks if it is a real user
        // so that we can add the proper extension instead
        // jfif, the extension for the test data
        const postsIds = [
            "62cc64d8ffeb3c58cca62478",
            "62cc8d788758ca2c97889c56",
            "62cc95768758ca2c978a66e0",
            "62cc9cac8758ca2c978bebeb",
            "62cdbc108758ca2c97c9e7e4",
            "62cdd80c8758ca2c97cfb901",
            "62cdd9cf8758ca2c97d020e5",
            "62cdde458758ca2c97d11e55",
            "62cde14b8758ca2c97d1ca10",
            "62cc814c8758ca2c9785c42d"
        ]
        const ex = postsIds.some(el => el === postId) ? ".jfif" : ""
        const imgURI = `users_images/${userId}/Avatar${ex}`
        const bitmap = fs.readFileSync(imgURI)
        const base64 =  new Buffer(bitmap).toString('base64')
        // inserting avatars of comments
        // console.log("before", post)
        post = {
            ...post,
            likes: post.likes.map(like => {
                const id = like.user.toString()
                const ex = getExt(id) 
                const imgURI = `users_images/${id}/Avatar${ex}`
                if (fs.existsSync(imgURI)) {
                    const bitmap = fs.readFileSync(imgURI)
                    const base64 =  new Buffer(bitmap).toString('base64')
                    return {
                        ...like,
                        avatar: base64
                    }
                } else {
                    return {
                        ...like,
                        avatar: false
                    }
                }   
            }),
            comments: post.comments.map(comment => {
                const id = comment.user.toString()
                const ex = getExt(id) 
                const imgURI = `users_images/${id}/Avatar${ex}`
                if (fs.existsSync(imgURI)) {
                    const bitmap = fs.readFileSync(imgURI)
                    const base64 =  new Buffer(bitmap).toString('base64')
                    return {
                        ...comment,
                        avatar: base64
                    }
                } else {
                    return {
                        ...comment,
                        avatar: false
                    }
                }
            }),
            shares: post.shares.map(share => {
                const id = share.user.toString()
                const ex = getExt(id) 
                const imgURI = `users_images/${id}/Avatar${ex}`
                if (fs.existsSync(imgURI)) {
                    const bitmap = fs.readFileSync(imgURI)
                    const base64 =  new Buffer(bitmap).toString('base64')
                    return {
                        ...share,
                        avatar: base64
                    }
                } else {
                    return {
                        ...share,
                        avatar: false
                    }
                }
            }),
            rewards: post.rewards.map(reward => {
                const id = reward.user.toString()
                const ex = getExt(id) 
                const imgURI = `users_images/${id}/Avatar${ex}`
                if (fs.existsSync(imgURI)) {
                    const bitmap = fs.readFileSync(imgURI)
                    const base64 =  new Buffer(bitmap).toString('base64')
                    return {
                        ...reward,
                        avatar: base64
                    }
                } else {
                    return {
                        ...reward,
                        avatar: false
                    }
                }
            }),
        }

        res.status(200).json({ 
            post: post,
            img: base64
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Server Error")
    }
})


// @route   Get api/posts/pagination
// @desc    Get paginated post based on the request
// @access  Private

router.get("/pagination", auth, async (req, res) => {
    const numOfPosts = req.header("num-of-posts")
    const skips = req.header("skips")
    try {
        const allPosts = await Post.find()
        const allPostsLen = allPosts.length
        if (allPostsLen - skips > numOfPosts) {
            const posts = await Post.find().sort({ _id: -1 }).skip(skips).limit(numOfPosts).populate('user', '-password')
            res.status(201).json(posts)
            return
        } else if (allPostsLen - skips > 0 && allPostsLen - skips <= numOfPosts) {
            const posts = await Post.find().sort({ _id: -1 }).skip(skips).limit(allPostsLen - skips).populate('user', '-password')
            res.status(201).json(posts)
            return
        }
        res.status(404).json("No More Data")
        return
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Server Error")
    }
})


// @route   DELETE api/posts/:id
// @desc    Delete a post
// @access  Private

router.delete("/:postid", auth, async (req, res) => {
    try {
        console.log(req.params.postid)
        const post = await Post.findById({ _id: req.params.postid })
        console.log(post)
        if (!post) {
            return res.status(404).json({ msg: "Post not found" })
        }
        // check that the right user is deleting the post
        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "User not authorized" })
        } 
        await post.remove()
        res.status(204).json({ msg: "Post removed" })
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Server Error")
    }
})


// @route   POST api/posts
// @desc    Create a post
// @access  Private

router.post("/", auth, [
    check("title", "Title Is Required").not().isEmpty(),
    check("desc", "Description Is Required").not().isEmpty(),
    check("deadline", "Deadline Is Required").not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    } 
    // destructure the body of the request
    const { title, desc, milestones, deadline, date } = req.body
    // getting the user's data
    const user = await User.findOne({ user: req.user.id })
    // create post fields
    let postFields = { 
        user: req.user.id,
        title: title,
        desc: desc,
        milestones: milestones,
        deadline: deadline,
        date: date
    }
    try {
        // Create new post
        const posts = await Post.find()
        let post = new Post(postFields)
        await post.save()
        res.status(201).send(post._id)
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Server Error")
    }
})


// @route   PUT api/posts/update/:postId
// @desc    Update a post
// @access  Private

router.put('/update/:postid', auth, async (req, res) => {
    const { title, desc, milestones, deadline, date } = req.body
    try {
        // select the post to be updated
        let post = await Post.findOne({ _id: req.params.postid })
        if (post) {
            post = await Post.findOneAndUpdate(
                { _id: req.params.postid},
                { title: title, desc: desc, milestones: milestones, deadline: deadline},
                { new: true }
            )
            await post.save()
            return res.status(201).send(post) 
        }
        res.status(404).send({ msg: "Post not found!" })
    } catch (err) {
        console.log(err.message)
        res.status(500).send("Server Error")
    }        
})


// @route   PUT api/posts/share/:postid
// @desc    Add to shares
// @access  Private

router.put("/share/:postid", auth, async (req, res) => {
    try {
        const date = req.body.currentDate
        const id = req.user.id 
        const post = await Post.findById(req.params.postid)
        // include the user in the beginning of the likes array
        const user = await User.findOne({ _id: id })
        post.shares.unshift({ 
            user: id,
            fName: user.fName + " " + user.lName,
            date: date
        })
        await post.save()
        const ex = getExt(id) 
        const imgURI = `users_images/${id}/Avatar${ex}`
        let base64
        if (fs.existsSync(imgURI)) {
            const bitmap = fs.readFileSync(imgURI)
            base64 =  new Buffer(bitmap).toString('base64')
        } 
        res.status(200).json({
            user: id,
            fName: user.fName + " " + user.lName,
            date: date,
            avatar: base64
        })
        return
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Server Error")
        return
    }
})

// @route   PUT api/posts/rewards/:postid
// @desc    Add to rewards
// @access  Private

router.put("/reward/:postid", auth, async (req, res) => {
    try {
        const reward = req.body.reward
        const post = await Post.findById(req.params.postid)
        // include the user in the beginning of the likes array
        const user = await User.findOne({ user: req.user.id })
        post.rewards.unshift({ 
            user: req.user.id,
            fName: user.fName + " " + user.lName,
            date: date,
            reward: reward
        })
        //await post.save()
        res.json(post.rewards)
        return
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Server Error")
        return
    }
})

// @route   POST api/posts/like/:postid
// @desc    Like a post
// @access  Private

router.put("/like/:postid", auth, async (req, res) => {
    try {
        const date = req.body.currentDate
        const id = req.user.id
        const post = await Post.findById(req.params.postid)
        // include the user in the beginning of the likes array
        const user = await User.findOne({ _id: id })
        const ex = getExt(id) 
        const imgURI = `users_images/${id}/Avatar${ex}`
        let base64
        if (fs.existsSync(imgURI)) {
            const bitmap = fs.readFileSync(imgURI)
            base64 =  new Buffer(bitmap).toString('base64')
        } 
        post.likes.unshift({ 
            user: id,
            fName: user.fName + " " + user.lName,
            date: date
        })
        // save without avatar
        await post.save()
        res.status(200).json({
            user: id,
            fName: user.fName + " " + user.lName,
            date: date,
            avatar: base64 
        })
        return
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Server Error")
        return
    }
})

// @route   PUT api/posts/unlike/:postid
// @desc    Unlike a post
// @access  Private

router.put("/unlike/:postid", auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.postid)
        // get the index of the unlike user
        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id)
        // remove the like in the likes array at index "removeIndex"
        post.likes.splice(removeIndex, 1)
        await post.save()
        res.status(200).json("Updated")
        return
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Server Error")
        return
    }
})


// @route   POST api/posts/comment/:postid
// @desc    Comment on a post
// @access  Private
// note: Need to add update comment

router.post("/comment/:postid", auth, async (req, res) => {
    try {
        const date = req.body.d
        const content = req.body.text
        const id = req.user.id
        const user = await User.findById(id).select('-password')
        const post = await Post.findById(req.params.postid)
        console.log(user, content, )
        const comment = {
            user: id,
            text: content,
            fName: `${user.fName} ${user.lName}`,
            date: date, 
        }
        // add the comment to the post's comment section
        post.comments.unshift(comment)
        // save the post's data
        await post.save()
        const ex = getExt(id) 
        const imgURI = `users_images/${id}/Avatar${ex}`
        let base64
        if (fs.existsSync(imgURI)) {
            const bitmap = fs.readFileSync(imgURI)
            base64 =  new Buffer(bitmap).toString('base64')
        } 
        res.status(200).json({
            user: id,
            fName: user.fName + " " + user.lName,
            date: date,
            text: content,
            avatar: base64 
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Server Error")
    }
})


// @route   PUT api/posts/comment/:postid/:commentid
// @desc    Update a comment 
// @access  Private

router.put("/comment/:postid/:commentid", auth, async (req, res) => {
    try {
        let post = await Post.findById(req.params.postid)
        // get the comment
        const comment = post.comments.find(comment => comment.id === req.params.commentid)
        // check if the comment actually exists 
        if (!comment) {
            return res.status(404).json({ msg: "Comment not found" })
        }
        // check the user
        if (comment.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "Unauthorized user" })
        }
        // update the comment
        post = await Post.findOneAndUpdate(
            { _id: req.params.postid},
            { $set: {"comments.$[comment].text": req.body.text }},
            { 
                arrayFilters: [{ "comment._id": req.params.commentid }],
                new: true
            }
        )
        // save the post's data
        await post.save()
        res.json(req.body.text)
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Server Error")
    }
})

// @route   DELETE api/posts/comment/:postid
// @desc    Delete a comment
// @access  Private

router.delete("/comment/:postid/:commentid", auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.postid)
        // get the comment
        const comment = post.comments.find(comment => comment.id === req.params.commentid)
        // check if the comment actually exists 
        if (!comment) {
            return res.status(404).json({ msg: "Comment not found" })
        }
        // get the index of the comment in the array's post
        const removeIndex = post.comments.map(comment => comment.id).indexOf(req.params.commentid)
        // remove the like in the likes array at index "removeIndex"
        post.comments.splice(removeIndex, 1)
        await post.save()
        res.json(post.comments)
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Server Error")
    }
})


// @route   POST api/posts/reward/:postid
// @desc    Post a reward to a post
// @access  Private

router.post('/reward/:postid', auth, async (req, res) => { 
    console.log(req.body)
    try {
        const date = req.body.d
        const id = req.user.id
        const reward = req.body.reward
        console.log(date, id, reward)
        const post = await Post.findById(req.params.postid)
        // include the user in the beginning of the likes array
        const user = await User.findOne({ _id: id })
        const ex = getExt(id) 
        const imgURI = `users_images/${id}/Avatar${ex}`
        let base64
        if (fs.existsSync(imgURI)) {
            const bitmap = fs.readFileSync(imgURI)
            base64 =  new Buffer(bitmap).toString('base64')
        } 
        post.rewards.unshift({ 
            user: id,
            fName: user.fName + " " + user.lName,
            date: date,
            reward: reward
        })
        // save without avatar
        await post.save()
        res.status(200).json({
            user: id,
            fName: user.fName + " " + user.lName,
            date: date,
            avatar: base64,
            reward: reward 
        })
        return
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Server Error")
        return
    }
})


// @route   GET api/posts/search/searchQuery
// @desc    Seach for the query in users, and posts
// @access  Private

router.get("/search/:searchQuery", auth, async (req, res) => {

    const query = req.params.searchQuery

    try {

        // get 8 words before the target word
        const before = /(([a-zA-Z0-9_.!?]+)[^a-zA-Z]+){0,8}/

        // get 8 words after the target word
        const after = /([^a-zA-Z]+([a-zA-Z0-9_.!?]+)){0,8}/

        const posts = await Post.find(
            {
                $or: [
                { "title" : { $regex: new RegExp(query), $options: 'i' } } ,
                { "desc" : { $regex: new RegExp(query), $options: 'i' } } ,
                { "milestones" : {$elemMatch:{milestone : { $regex: new RegExp(query), $options: 'i' } } } } ,
                // etc. add your other fields as well here
                ]
            }).populate('user', '-password')

        const users = await User.find({
            $or: [
                { "fName" : { $regex: new RegExp(query), $options: 'i' } },
                { "lName" : { $regex: new RegExp(query), $options: 'i' } },
            ]
        })    

        let postsRes = posts.map((el) => {

            const q = query.split(" ").join("|")
            
            let findInDesc = el.desc.match(new RegExp(before.source + q + after.source, "ig" ))
            let miles = el.milestones.find(el => { 
                let res = el.milestone.match(new RegExp(before.source + q + after.source, "ig" ))
                if (res !== null) {
                    return res
                } 
            })

            // get the profile's avatar
            function getAvatar () {
                const id = el.user._id.toString()
                console.log(id)
                const ex = getExt(id) 
                const imgURI = `users_images/${id}/Avatar${ex}`
                if (fs.existsSync(imgURI)) {
                    const bitmap = fs.readFileSync(imgURI)
                    const base64 =  new Buffer(bitmap).toString('base64')
                    return base64
                } else {
                    return false
                } 
            }
                
            const tnam = new RegExp(q, 'ig')

            if (tnam.test(el.title)) {
                return { profile: {
                    postId: el._id,
                    fName: el.user.fName,
                    lName: el.user.lName,
                    date: el.date,
                    avatar: {
                        img: getAvatar(),
                        extension: el.user.avatar.extension
                    },
                }, trg: el.title }
            }

            if (findInDesc !== null ) {
                return { profile: {
                    postId: el._id,
                    fName: el.user.fName,
                    lName: el.user.lName,
                    date: el.date,
                    avatar: {
                        img: getAvatar(),
                        extension: el.user.avatar.extension
                    },
                }, trg: "..." + findInDesc[0].trim() + "..."}
            }

            if ( typeof miles !== 'undefined' ) {
                return { profile: {
                    postId: el._id,
                    fName: el.user.fName,
                    lName: el.user.lName,
                    date: el.date,
                    avatar: {
                        img: getAvatar(),
                        extension: el.user.avatar.extension
                    },
                }, trg: miles.milestone}
            }
            return ""
        })
        
        let usersRes = users.map((el) => {

            // get the avatars
            function getAvatar () {
                const id = el._id.toString()
                console.log(id)
                const ex = getExt(id) 
                const imgURI = `users_images/${id}/Avatar${ex}`
                if (fs.existsSync(imgURI)) {
                    const bitmap = fs.readFileSync(imgURI)
                    const base64 =  new Buffer(bitmap).toString('base64')
                    return base64
                } else {
                    return false
                } 
            }

            const q = query.split(" ").join("|")

            const tnam = new RegExp(q, 'ig')

            if (tnam.test(el.fName) || tnam.test(el.lName) || tnam.test(el.fName + el.lName)) {
                return { profile: {
                    userId: el._id,
                    fName: el.fName,
                    lName: el.lName,
                    avatar: {
                        img: getAvatar(),
                        extension: el.avatar.extension
                    }
                } }      
            }
            return ""
        })
        res.status(200).json({ posts: postsRes, users: usersRes })
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Server Error")
    }
})


module.exports = router