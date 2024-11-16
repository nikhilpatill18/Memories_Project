import { PostMessage } from "../models/postMessage.model.js"
import { asynchandler } from "../utils/asynchandler.js"
import { apiresponse } from "../utils/apiresponse.js"
import { apierror } from "../utils/apierror.js"
const posts = async (req, res) => {
    res.status(200).json({
        sucess: "ok"
    })
}

const createpost = asynchandler(
    async (req, res) => {
        try {
            const { title, message, creator, tags } = req.body

            if (!title) {
                throw new apierror(300, "title is required")
            }


            const posts = await PostMessage.create({
                title: title,
                creator: creator,
                tags: tags,
                message: message

            })
            if (!posts) {
                throw new apierror(300, "Failed to create post")
            }
            return res.status(200).json(new apiresponse(200, posts, "Post created Sucssfully"))
        } catch (error) {
            throw new apierror(300, error.message)

        }

    }
)



export { posts }