import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createpost = createAsyncThunk(
    async (postdata) => {
        const response = await axios.post("http://localhost:4000/app/creatpost", postdata)
        console.log(response)
        return response.json
    }
)

const initialState = {
    posts: [],
}

export const fetchPostsAsync = createAsyncThunk(
    'posts/fetchPosts',  // Action type string
    async () => {
        // Replace this URL with your actual API endpoint
        const response = await axios.get('');
        return response.data;  // Axios automatically resolves to response.data
    }
);

const postsslice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        fetchPosts: (state, action) => {
            state.posts = action.payload
        },
        addPost: (state, action) => {
            state.posts.push(action.payload)
        },

    }
})

export const { fetchPosts, addPost } = postsslice.actions;

export default postsslice.reducer
