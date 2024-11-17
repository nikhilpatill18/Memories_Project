import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createpost = createAsyncThunk(
    async (postdata) => {
        const response = await axios.post("http://localhost:4000/app/creatpost", postdata, {
            headers: {
                'Content-Type': 'multipart/form-data', // Set the content type for file upload
            },
        })
        // console.log(response)
        return response.data
    }
)

export const updatepost = createAsyncThunk(
    async (postdata) => {
        const response = await axios.put(`http://localhost:4000/app/updatepost/${postdata_id}`, postdata, {
            headers: {
                'Content-Type': 'multipart/form-data', // Set the content type for file upload
            },
        })
        return response.data.data
    }
)



export const fetchPostsAsync = createAsyncThunk(

    'posts/fetchPosts',  // Action type string
    async () => {
        // console.log("fetch post")
        // Replace this URL with your actual API endpoint
        const response = await axios.get('http://localhost:4000/app/getdata');
        // console.log("nhsdshcsdbsbv")
        // console.log(response.data.data, "aldcadc")
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
        // fetchPosts: (state, action) => {
        //     console.log(action, "njkn")
        //     state.posts = action.payload
        // },
        addPost: (state, action) => {
            state.posts.push(action.payload)
        },
        updatepost: (state, action) => {
            state.posts = state.posts.map((post) => {
                console.log(post._id)
                if (post._id == action.payload._id) {
                    return action.payload
                }
                return post
            })
        }

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
            // .addCase(createpost.fulfilled, (state, action) => {
            //     state.posts.push(action.payload);  // Add new post to the state
            // });.
            .addCase(updatepost.fulfilled, (state, action) => {
                state.posts = state.posts.map((post) => {
                    console.log(post._id)
                    if (post._id == action.payload._id) {
                        return action.payload
                    }
                    return post
                })
            })
    },

})

export const { fetchPosts, addPost } = postsslice.actions;

export default postsslice.reducer
