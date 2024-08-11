import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts/${id}`
        );
        setPost(response.data);
      } catch (error) {
        setError("Error fetching post details");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 flex justify-center items-center">
        <div className="text-center text-white text-2xl">Loading...</div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 flex justify-center items-center">
        <div className="text-center text-red-500 text-2xl">{error}</div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 flex justify-center items-center">
      <div className="max-w-3xl bg-white p-8 rounded-lg shadow-2xl">
        <h1 className="text-4xl font-bold mb-6 text-blue-700">{post.title}</h1>
        <p className="text-lg text-gray-800 leading-relaxed">{post.body}</p>
      </div>
    </div>
  );
};

export default PostDetail;
