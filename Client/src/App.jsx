import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostsAsync } from './redux/postslice';
import Form from './components/form/Form';
import { deletePost } from './apicalling/api';
import { deletepost } from './redux/postslice';

import './index.css'; // This should import your Tailwind styles
function App() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const status = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);
  const [currentpost, setcurrentpost] = useState(null)

  // const handleonupdate = (post) => {
  //   setcurrentpost(post)
  // }

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPostsAsync());
    }
  }, [dispatch, status, posts]);

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-300 via-indigo-200 to-purple-300 p-10">
      <header className="text-center mb-16">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500">
          Create Your Memories Here
        </h1>
        <p className="mt-3 text-xl text-gray-700">Share your thoughts, experiences, and images with the world.</p>
      </header>

      <div className="flex flex-col lg:flex-row gap-12 items-start">
        {/* Left Side: Post List */}
        <div className="flex-1 max-w-4xl bg-white p-6 rounded-lg shadow-lg space-y-6 overflow-y-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Recent Posts</h2>
          {status === 'loading' && <p className="text-blue-500">Loading...</p>}
          {status === 'failed' && <p className="text-red-500">Error: {error}</p>}
          {status === 'succeeded' && (
            <div className="space-y-6">
              {posts.map((post) => (
                <div
                  key={post._id}
                  className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white p-4 rounded-lg shadow-lg flex flex-col space-y-4 relative group hover:shadow-2xl transition-shadow duration-300"
                >
                  <img
                    src={post.selectedfile || 'https://via.placeholder.com/200'}
                    alt="Post"
                    className="w-full h-48 object-cover rounded-md"
                  />
                  <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black bg-opacity-50 rounded-md transition-opacity duration-300">
                    <button
                      className="bg-blue-500 text-white py-2 px-4 rounded-lg mx-2 hover:bg-blue-600 transition duration-200"
                      onClick={() => setcurrentpost(post)}
                    >
                      Update
                    </button>
                    <button
                      className="bg-red-500 text-white py-2 px-4 rounded-lg mx-2 hover:bg-red-600 transition duration-200"
                      onClick={async () => {
                        dispatch(deletepost(post._id));
                        await deletePost(post._id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                  <h3 className="text-2xl font-semibold">{post.title}</h3>
                  <p className="text-md">{post.message}</p>
                  <div className="text-sm text-gray-300">Posted by: {post.creator}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Create or Update Post Form */}
        <div className="flex-1 max-w-lg bg-white p-8 rounded-lg shadow-lg space-y-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            {currentpost ? 'Update Your Post' : 'Create New Post'}
          </h2>
          <Form currentpost={currentpost} setcurrentpost={setcurrentpost} />
        </div>
      </div>
    </div>
  );
}

export default App
