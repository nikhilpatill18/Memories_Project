import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostsAsync } from './redux/postslice';
import Form from './components/form/Form';

import './index.css'; // This should import your Tailwind styles
function App() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const status = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPostsAsync());
    }
  }, [dispatch, status, posts]);

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-300 p-10">
      {/* Header: "Create Your Memories Here" */}
      <header className="text-center mb-16">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500">
          Create Your Memories Here
        </h1>
        <p className="mt-3 text-xl text-gray-700">Share your thoughts, experiences, and images with the world.</p>
      </header>

      <div className="flex justify-between items-start gap-12">
        {/* Left Side: Post List */}
        <div className="flex-1 max-w-lg bg-white p-6 rounded-lg shadow-2xl space-y-6">
          <h2 className="text-3xl font-bold text-gray-800">Recent Posts</h2>
          {status === 'loading' && <p className="text-blue-500">Loading...</p>}
          {status === 'failed' && <p className="text-red-500">Error: {error}</p>}
          {status === 'succeeded' && (
            <div className="space-y-6">
              {posts.map((post) => (
                <div
                  key={post._id}
                  className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white p-4 rounded-lg shadow-lg flex flex-col space-y-4"
                >
                  <img
                    src={post.selectedfile || 'https://via.placeholder.com/200'} // Fallback if no image
                    alt="Post"
                    className="w-full h-48 object-cover rounded-md"
                  />
                  <h3 className="text-2xl font-semibold">{post.title}</h3>
                  <p className="text-md">{post.message}</p>
                  <div className="text-sm text-gray-300">Posted by: {post.creator}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Create Post Form */}
        <div className="flex-1 max-w-lg bg-white p-8 rounded-lg shadow-2xl space-y-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Create New Post</h2>
          <Form />
        </div>
      </div>
    </div>
  );
}

export default App
