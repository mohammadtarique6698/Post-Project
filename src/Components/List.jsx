import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "../features/posts/slice";
import { TypeAnimation } from "react-type-animation";

const PostList = ({ newPost }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.items);
  const postStatus = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);

  const [page, setPage] = React.useState(0);

  useEffect(() => {
    dispatch(fetchPosts({ start: page * 5, limit: 5 }));
  }, [page, dispatch]);

  let updatedPosts = posts;

  if (newPost) {
    updatedPosts = [newPost, ...posts];
  } else {
    updatedPosts = [...posts];
  }

  let content;

  if (postStatus === "loading") {
    content = (
      <p className="text-center text-lg font-medium text-white">Loading...</p>
    );
  } else if (postStatus === "succeeded") {
    content = updatedPosts.map((post) => (
      <li
        key={post.id}
        className="mb-4 p-6 bg-white bg-opacity-90 shadow-lg rounded-lg hover:bg-blue-100 transition-all"
      >
        <Link to={`/posts/${post.id}`} className="block">
          <h2 className="text-xl font-semibold text-blue-800 hover:underline">
            <TypeAnimation
              cursor={false}
              sequence={[post.title, 1000, ""]}
              repeat={Infinity}
              wrapper="span"
            />
          </h2>
          <p className="text-gray-700 mt-2">{post.body}</p>
        </Link>
      </li>
    ));
  } else if (postStatus === "failed") {
    content = (
      <p className="text-center text-red-500 text-lg font-semibold">{error}</p>
    );
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500
      flex flex-col justify-center items-start w-full py-8 px-4 mb-8"
    >
      <h1 className="text-4xl font-bold text-white text-left mb-8">Posts</h1>
      <ul className="w-full">{content}</ul>
      <div className="flex justify-between mt-8 w-full">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 0}
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          Previous
        </button>
        <button
          onClick={() => setPage(page + 1)}
          disabled={posts.length < 5}
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PostList;
