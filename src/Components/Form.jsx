import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createPost } from "../features/posts/slice";

const PostForm = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!title) {
      setError("Title is required");
      return;
    }

    try {
      await dispatch(createPost({ title, body })).unwrap();
      navigate("/");
    } catch (error) {
      setError("Failed to create post");
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 
      flex justify-center items-center py-8 px-4"
    >
      <div className="max-w-2xl w-full bg-white p-8 rounded-lg shadow-2xl">
        <h1 className="text-3xl font-bold text-center mb-8 text-purple-700">
          Create New Post
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-lg font-semibold mb-2">Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-purple-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-lg font-semibold mb-2">
              Description:
            </label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              maxLength="1000"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-purple-500"
            />
          </div>
          {error && (
            <p className="text-red-500 mb-6 text-center font-medium">{error}</p>
          )}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-full hover:bg-purple-700 font-semibold transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostForm;
