import axios from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit";

export const deletePost = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:4000/app/delete/${id}`);
        // console.log("deleted data is coming hello", response)a

        return response
    }
    catch (err) {
        console.log(err)
    }
}

export const createpost = async (formdata) => {
    const response = await axios.post('http://localhost:4000/app/createpost', formdata, {
        headers: {
            'Content-Type': 'multipart/form-data', // Set the content type for file upload
        },
    })
    return response
}

export const updatepost = async (formdata, post_id) => {
    const response = await axios.patch(`http://localhost:4000/app/update/${post_id}`, formdata, {
        headers: {
            'Content-Type': 'multipart/form-data', // Set the content type for file upload
        },
    })
    return response
}

