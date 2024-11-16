import React, { useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { createpost } from '../../redux/postslice'

import { addPost } from '../../redux/postslice'
import axios from 'axios'


const Form = () => {

    const dispatch = useDispatch()
    const [title, settitle] = useState('')
    const [message, setmessage] = useState('')
    const [creator, setcreator] = useState('')
    const [file, setfile] = useState(null)
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setfile(selectedFile);
    }
    const handleonsubmit = async (e) => {
        e.preventDefault()

        console.log("handleFileChange")


        const formdata = new FormData()
        formdata.append('title', title)
        formdata.append('message', message),
            formdata.append('creator', creator)
        if (file) {
            formdata.append('selectedfile', file)
        }

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
            }
            else {
                console.log("some error")

            }
        }
        catch (err) {
            console.log(err)
        }
    }


    return (
        <>
            hi
            <form onSubmit={handleonsubmit}>
                <h2>Create New Post</h2>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => settitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="message">message</label>
                    <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setmessage(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="creator">creator</label>
                    <textarea
                        id="creator"
                        value={creator}
                        onChange={(e) => setcreator(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="selectedfile">File</label>
                    <input type="file" id="selectedfile" onChange={handleFileChange} />
                </div>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default Form
