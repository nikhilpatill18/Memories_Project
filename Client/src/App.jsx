import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostsAsync } from './redux/postslice';

import './index.css'; // This should import your Tailwind styles
function App() {
  // const dispatch = useDispatch();
  // const posts = useSelector(state => state.posts.posts)
  // useEffect(() => {
  //   const fetcheddata = fetchPostsAsync()
  //   console.log(fetcheddata)
  //   console.log("useeffect")
  //   dispatch(fetchPosts(fetcheddata))
  // }, [dispatch])



  // return (
  //   <>
  //     <div>
  //       <h1>Posts</h1>


  //       <ul>
  //         {posts.map(post => (
  //           <li key={post._id}>
  //             {post.title}
  //             <button onClick={() => handleDeletePost(post.id)}>Delete</button>
  //           </li>
  //         ))}
  //       </ul>
  //     </div>

  //   </>
  // )
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const status = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPostsAsync());
    }
  }, [dispatch, status]);

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Posts</h2>
      {posts && Array.isArray(posts) && posts.length > 0 ? (
        <ul>
          {posts.map((post) => (
            <li key={post._id}>{post.title}</li>  // Assuming posts have an 'id' and 'title'
          ))}
        </ul>
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
}

export default App
