import { Router } from "express";
import { posts, createpost } from "../controller/posts.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const postrouter = Router();

postrouter.route('/createpost').post(upload.single('selectedfile'), createpost)
postrouter.route('/getdata').get(posts)

export { postrouter }