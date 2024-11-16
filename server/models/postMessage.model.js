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
    selectedfile: {
        type: String,
    },
    likecount: {
        type: Number,
        default: 0

    }

}, { timestamps: true })


export const PostMessage = mongoose.model('PostMessage', postSchema);
