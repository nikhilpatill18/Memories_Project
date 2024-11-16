import { Router } from "express";
import { posts, createpost } from "../controller/posts.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const postrouter = Router();

postrouter.route('/creatpost').post(upload.single('selectedfile'), createpost)

export { postrouter }