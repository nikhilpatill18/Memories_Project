import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser'

const app = express();

app.use(bodyParser.json({
    limit: "30mb",
    extended: true
}))

app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))

app.use(cookieParser())
app.use(cors())

import { postrouter } from "./routes/posts.routes.js";

app.use('/app', postrouter)

export default app