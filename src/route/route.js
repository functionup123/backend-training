const express = require('express');
const router = express.Router();
const authorController= require("../controller/authorController")
const blogController = require("../controller/blogController")
const auth = require ('../middleware/auth')
router.get('/test-me',function(req,res){
    res.send({msg : "test done "})
})

router.post("/authors",authorController.createAuthor)

router.post('/blogs',blogController.createBlogs)

router.get('/blogs',blogController.getBlogs)

router.delete('/blogs/:blogId',blogController.deleteBlogs)

router.put("/blogs/:blogId",auth.authorisation,blogController.updatedBlogs)

router.delete('/blogs',blogController.deleteByQuery)

router.post('/login',authorController.login)
module.exports=router




