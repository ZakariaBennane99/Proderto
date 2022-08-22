const express = require('express')
const app = express()
const cors = require('cors')
const connectDB = require('./config/db')
const bodyParser = require('body-parser')
const cron = require('node-cron')
const mongoose = require('mongoose')
const Post = require("./models/Post")
const PORT = process.env.PORT || 3000


// connect the DB
connectDB()

// bodyParser is included in Express
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))

// cors as a middleware to work on all routes
app.use(cors()) 




// update MongoDB's posts depending on their category

function isLessThanOneDay (d) {

  // the post's deadline date
  const pDay = parseInt(d.split(",")[0])
  const pMonth = parseInt(d.split(",")[1])
  const pYear = parseInt(d.split(",")[2])
  const pHour = parseInt(d.split(",")[3].split(":")[0])

  // the current date
  const date = new Date() 
  const cDay = date.getDate()
  // 1 because it starts from 0
  const cMonth = date.getMonth() + 1 
  const cYear = date.getFullYear()
  const cHour = date.getHours()
  
  return (pDay - cDay === 1 || (pDay === cDay && pHour - cHour >  0)) && pMonth === cMonth && pYear === cYear

}

function isAchieved (milestones) {
  return milestones.every(mlst => mlst.achieved)
}

// to be updated

cron.schedule('0 0 0 * * *', () => { 
  (async () => {

    let posts = await Post.find()
  
    posts.map(async (post) => {
      if (isLessThanOneDay(post.deadline)) {
        await Post.findOneAndUpdate({ _id: post.id }, { $set: { category: 'deadline' }})
      } else if (isAchieved(post.milestones)) {
        await Post.findOneAndUpdate({ _id: post.id }, { $set: { category: 'achieved' }})
      } else {
        await Post.findOneAndUpdate({ _id: post.id }, { $set: { category: 'newGoals' }})
      }
    })
  
  })()
})




// instead of bringing all of the routes in this file
// we segment the routes for eacy access and alteration 
app.use('/api/users', require('./routes/users'))
app.use('/api/emails-manager', require('./routes/emails_manager'))
app.use('/api/posts', require('./routes/posts'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/marketing', require('./routes/marketing'))
app.use('/api/profile', require('./routes/profile'))



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})