import React, { useEffect, useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { createpost, fetchPostsAsync, updatepost } from '../../redux/postslice'

import { addPost } from '../../redux/postslice'
import axios from 'axios'
import { current } from '@reduxjs/toolkit'


const Form = ({ currentpost, setcurrentpost }) => {

    const dispatch = useDispatch()
    const [title, setTitle] = useState('')
    const [message, setMessage] = useState('')
    const [creator, setCreator] = useState('')
    const [file, setfile] = useState(null)

    const status = useSelector((state) => state.posts.status)



    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setfile(selectedFile);
    }


    useEffect(() => {
        if (currentpost) {
            setTitle(currentpost.title)
            setCreator(currentpost.creator)
            setMessage(currentpost.message)
            setfile(null)
        }

    }, [currentpost])



    const handleonsubmit = async (e) => {
        e.preventDefault()
        const formdata = new FormData()
        formdata.append('title', title)
        formdata.append('message', message),
            formdata.append('creator', creator)
        if (file) {
            formdata.append('selectedfile', file)
        }

        if (currentpost) {
            // console.log(currentpost)
            // const response = dispatch(updatepost(currentpost))
            const response = await axios.patch(`http://localhost:4000/app/update/${currentpost._id}`, formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Set the content type for file upload
                },
            })
            // console.log(response)
            if (response.status == 200) {
                dispatch(updatepost(response.data))
            }
            setTitle('')
            setMessage('')
            setCreator('')
            setfile(null)
        }
        else {
            try {
                const response = await axios.post('http://localhost:4000/app/createpost', formdata, {
                    headers: {
                        'Content-Type': 'multipart/form-data', // Set the content type for file upload
                    },
                })
                console.log(response)
                if (response.status === 200) {
                    dispatch(addPost(response.data));
                    console.log('Post added successfully');
                    setTitle('')
                    setMessage('')
                    setCreator('')
                    setfile(null)
                }
                else {
                    console.log("some error")

                }
            }
            catch (err) {
                console.log(err)
            }
        }

    }


    return (
        <form onSubmit={handleonsubmit} className="space-y-6">
            <div className="flex flex-col">
                <label htmlFor="title" className="text-lg font-semibold text-gray-700">Title</label>
                <input
                    type="text"
                    id="title"
                    className="p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>

            <div className="flex flex-col">
                <label htmlFor="message" className="text-lg font-semibold text-gray-700">Message</label>
                <textarea
                    id="message"
                    className="p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                />
            </div>

            <div className="flex flex-col">
                <label htmlFor="creator" className="text-lg font-semibold text-gray-700">Creator</label>
                <input
                    type="text"
                    id="creator"
                    className="p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={creator}
                    onChange={(e) => setCreator(e.target.value)}
                    required
                />
            </div>

            <div className="flex flex-col">
                <label htmlFor="selectedfile" className="text-lg font-semibold text-gray-700">Upload Image</label>
                <input
                    type="file"
                    id="selectedfile"
                    onChange={handleFileChange}
                    className="p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
            </div>

            <button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 to-yellow-500 text-white p-3 rounded-md shadow-lg font-semibold hover:bg-gradient-to-l"
            >
                Submit Post
            </button>
        </form>
    )
}

export default Form
