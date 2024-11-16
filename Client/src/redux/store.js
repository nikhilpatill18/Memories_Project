import { configureStore } from '@reduxjs/toolkit'

import postsReducer from './postslice'

export const store = configureStore({
    reducer: {
        posts: postsReducer
    },
})