import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import PostList from "./Components/List.jsx";
import PostDetail from "./Components/Details.jsx";
import PostForm from "./Components/Form.jsx";
import Footer from "./Components/Footer.jsx";

const App = () => {
  const [newPost, setNewPost] = useState(null);

  const handlePostCreated = (post) => {
    setNewPost(post);
  };

  return (
    <div className="container p-4">
      <div className="flex flex-row gap-4 justify-between mb-4">
        <button className="bg-blue-500 px-3 py-2 rounded-md shadow-md">
          <Link to="/" className="text-white">
            Posts
          </Link>
        </button>

        <h1 className="font-bold text-3xl">Welcome to the World of Posts</h1>

        <button className="bg-blue-500 px-3 py-2 rounded-md shadow-md">
          <Link to="/create" className="text-white">
            Create New Post
          </Link>
        </button>
      </div>
      <Routes>
        <Route path="/" element={<PostList newPost={newPost} />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route
          path="/create"
          element={<PostForm onPostCreated={handlePostCreated} />}
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
