const cookiParser = require('cookie-parser')
const express = require('express');
const app = express();
const port = 5000

require('dotenv').config()

// build in middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// cookies midleware
app.use(cookiParser())


const userRouter = require('./routes/user.routes')
const postRouter = require('./routes/post.routes')

app.use('/api', userRouter)
app.use('/api', postRouter)

app.get('/', (req, res) => {
  res.send("hi ")
});


app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})