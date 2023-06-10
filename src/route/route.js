const express=require("express");
const router=express.Router();
const {createAuthor, loginAuthor}=require('../Controller/authorController');
const {getAllAuthors}=require('../Controller/authorController');
const {authMiddleware}= require('../middlewares/auth')
const {createBlog, getAllBlogs, updateBlog, deleteBlog, deleteBlogsByQuery}= require('../Controller/blogController')

router.post('/authors', createAuthor)
router.post('/login', loginAuthor)
router.get('/authordetails', getAllAuthors)

router.post("/blogs", authMiddleware, createBlog)
router.get("/blogs", authMiddleware, getAllBlogs)  
router.put("/blogs/:blogId", authMiddleware, updateBlog)
router.delete("/blogs/:blogId", authMiddleware, deleteBlog)
router.delete("/blogs", authMiddleware, deleteBlogsByQuery)
module.exports=router;