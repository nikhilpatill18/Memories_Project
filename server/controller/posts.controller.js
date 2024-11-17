import { PostMessage } from "../models/postMessage.model.js"
import { asynchandler } from "../utils/asynchandler.js"
import { apiresponse } from "../utils/apiresponse.js"
import { apierror } from "../utils/apierror.js"
import { uploadoncloudinary } from "../utils/fileupload.js"
const posts = async (req, res) => {
    const posts = await PostMessage.find()
    // console.log(posts)

    return res.status(200).json(new apiresponse(200, posts, "get successfully"))
}

const createpost =
    async (req, res) => {

        const { title, message, creator } = req.body

        if (!title) {
            throw new apierror(300, "title is required")
        }

        const localfilepath = req.file.path;
        if (!localfilepath) {
            throw new apierror(300, "file not found")
        }

        const uploadfile = await uploadoncloudinary(localfilepath)
        // console.log(localfilepath)
        // console.log(uploadfile)

        if (!uploadfile) {
            throw new apierror(300, "unable to upload the files")
        }


        const posts = await PostMessage.create({
            title: title,
            creator: creator,
            message: message,
            selectedfile: uploadfile.url

        })
        if (!posts) {
            throw new apierror(300, "Failed to create post")
        }
        return res.status(200).json(new apiresponse(200, posts, "Post created Sucssfully"))

    }



const updatepost = async (req, res) => {
    try {
        const { postID } = req.params
        const { title, message, creator } = req.body
        console.log(req.file)
        const localfilepath = req.file.path;
        if (!localfilepath) {
            throw new apierror(300, "file not found")
        }

        const uploadfile = await uploadoncloudinary(localfilepath)
        // console.log(localfilepath)
        // console.log(uploadfile)

        if (!uploadfile) {
            throw new apierror(300, "unable to upload the files")
        }

        // console.log(uploadfile.url)
        const post = await PostMessage.findByIdAndUpdate(postID, {
            $set: {
                title: title,
                message: message,
                creator: creator,
                selectedfile: uploadfile.url
            }
        },
            {
                new: true
            }
        )
        if (!post) {
            throw new apierror(300, "post not found")
        }
        return res.status(200).json(new apiresponse(200, post, "post updated"))
    }
    catch (error) {
        throw new apierror(300, error.message)
    }
}

const deletepost = async (req, res) => {
    const { postID } = req.params

    if (!postID) {
        throw new apierror(404, "post not found")
    }
    const deletepost = await PostMessage.deleteOne({ _id: postID })

    if (!deletepost) {
        throw new apierror("Unbale to delete the post")
    }
    return res.status(200).json(new apiresponse(200, deletepost, "post deleted sucessfully"))
}


export { posts, createpost, deletepost, updatepost }