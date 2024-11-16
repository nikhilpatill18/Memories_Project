import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { fetchPosts, addPost } from './redux/postslice';

import './index.css'; // This should import your Tailwind styles
function App() {
  // const dispatch = useDispatch();
  // const posts = useSelector(state => state.posts.posts)
  // useEffect(() => {
  //   const fetcheddata = [{
  //     id: 1, title: "one"
  //   },
  //   {
  //     id: 2, title: "two"
  //   }
  //   ]

  //   dispatch(fetchPosts(fetcheddata))
  // }, [dispatch])

  // const handleaddpost = () => {
  //   const newpost = { id: 3, title: "three" }
  //   dispatch(addPost(newpost))
  // }

  // return (
  //   <>
  //     <div>
  //       <h1>Posts</h1>
  //       <button onClick={handleaddpost}>Add Post</button>


  //       <ul>
  //         {posts.map(post => (
  //           <li key={post.id}>
  //             {post.title}
  //             <button onClick={() => handleDeletePost(post.id)}>Delete</button>
  //           </li>
  //         ))}
  //       </ul>
  //     </div>

  //   </>
  // )
}

export default App
