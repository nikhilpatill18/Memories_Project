import { v2 as cloudinary } from 'cloudinary'


import fs from 'fs'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
    api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET // Click 'View API Keys' above to copy your API secret
});


const uploadoncloudinary = async (localfilepath) => {
    try {
        // console.log("uploading")
        // console.log(localfilepath)
        if (!localfilepath) return null

        let response = await cloudinary.uploader.upload(localfilepath, {
            resource_type: 'auto',
        })
        // console.log(response)
        // fs.unlink(localfilepath)
        return response

    }
    catch (err) {
        console.error(err)
    }
}
export { uploadoncloudinary }