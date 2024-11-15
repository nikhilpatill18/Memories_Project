import app from "./app.js";
import dotenv from 'dotenv'
import connectdb from './db/index.js'
dotenv.config({
    path: '/.env'
})
connectdb()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running on port ${process.env.PORT || 8000}`)
        })
    })
    .catch((err) => {
        console.log("data base connection error", err);

    })

console.log("server is set")