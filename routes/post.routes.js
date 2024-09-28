const express = require('express')
const router = express.Router()

const isLoggedIn = require('../middlewares/logIn.middleware')
const { createPost, updatePost, deletePost, getAllPost } = require('../controllers/post.controller')

router.route('/post/create').post(isLoggedIn, createPost)

router.route('/post/update/:id').put(isLoggedIn, updatePost)

router.route('/post/delete/:id').delete(isLoggedIn, deletePost)

router.route('/post/get').get(getAllPost)







module.exports = router