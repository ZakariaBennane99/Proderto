const jwt = require("jsonwebtoken")
require('dotenv').config()

// this is a middlware function that we are going to export
module.exports = function (req, res, next) {
    // get the token from the header
    const token = req.header("x-auth-token")

    // check if no token
    if (!token) {
        // 401 means not authorized
        return res.status(401).json({ msg: "No token, authorization denied!" })
    }

    // verify token
    try { 
        const decoded = jwt.verify(token, process.env.USER_JWT_SECRET)
        // setting the user who sends the request to decoded.user 
        // which is basically the user associated with the token
        req.user = decoded.user
        console.log(req.user)
        next()
    } catch(err) {
        res.status(403).json({ msg: "Token is not valid" })
    }
}
