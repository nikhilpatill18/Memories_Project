import { Router } from "express";
import posts from "../controller/posts.controller.js";

const postrouter = Router();

postrouter.route('/post').post(posts)

export { postrouter }