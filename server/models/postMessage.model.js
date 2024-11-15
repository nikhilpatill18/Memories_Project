import mongoose, { Schema } from 'mongoose';

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
    },
    creator: {
        type: String,
    },
    tags: [
        {
            type: String,
        }
    ],
    selectedfile: {
        type: String,
    },
    likecount: {
        type: Number,
        default: 0

    }

}, { timestamps: true })


export const Post = mongoose.model('Post', postSchema);
