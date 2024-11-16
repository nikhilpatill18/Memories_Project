import { PostMessage } from "../models/postMessage.model.js"
import { asynchandler } from "../utils/asynchandler.js"
import { apiresponse } from "../utils/apiresponse.js"
import { apierror } from "../utils/apierror.js"
const posts = async (req, res) => {
    res.status(200).json({
        sucess: "ok"
    })
}



export { posts }