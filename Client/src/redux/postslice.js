import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchPostsAsync = createAsyncThunk(

    'posts/fetchPosts',
    async () => {
        const response = await axios.get('http://localhost:4000/app/getdata');

        return response.data.data;  // Axios automatically resolves to response.data
    }
);

const initialState = {
    posts: [],
    status: 'idle',
    error: null
}
const postsslice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addPost: (state, action) => {
            state.posts.push(action.payload)
        },
        updatePost: (state, action) => {
            const updatedPost = action.payload;
            state.posts = state.posts.map(post =>
                post._id === updatedPost._id ? updatedPost : post
            );
        },

        deletepost: (state, action) => {
            const postId = action.payload;
            state.posts = state.posts.filter(post => post._id !== postId);
        },

    }
    ,
    extraReducers: (builder) => {
        // Handling async actions using createAsyncThunk
        builder
            .addCase(fetchPostsAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPostsAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.posts = action.payload;  // Save fetched posts to state
            })
            .addCase(fetchPostsAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    },

})

export const { fetchPosts, addPost, updatePost, deletepost } = postsslice.actions;

export default postsslice.reducer
