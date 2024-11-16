import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: [],
}


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
