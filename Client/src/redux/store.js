import { configureStore } from '@reduxjs/toolkit'

import postsReducer from './authslice3'

export const store = configureStore({
    reducer: {
        posts: postsReducer
    },
})