import { Router } from "express";
import { posts, createpost, deletepost, updatepost } from "../controller/posts.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const postrouter = Router();

postrouter.route('/createpost').post(upload.single('selectedfile'), createpost)
postrouter.route('/getdata').get(posts)
postrouter.route('/delete/:postID').delete()
postrouter.route('/update/:postID').patch(upload.single('selectedfile'), updatepost)

export { postrouter }