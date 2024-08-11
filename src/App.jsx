import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import PostList from "./components/List.jsx";
import PostDetail from "./components/Details.jsx";
import PostForm from "./components/Form.jsx";
import Footer from "./Components/Footer.jsx";

const App = () => {
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
        <Route path="/" element={<PostList />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/create" element={<PostForm />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
