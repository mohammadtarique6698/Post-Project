import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk to fetch posts
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async ({ start = 0, limit = 10 }) => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${limit}`
    );
    return response.data;
  }
);

// Thunk to create a new post
export const createPost = createAsyncThunk(
  "posts/createPost",
  async (newPost, { dispatch }) => {
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/posts",
      newPost
    );
    // Simulate adding the new post to the state
    dispatch(postAdded(response.data));
    return response.data;
  }
);

// Slice for posts
const postsSlice = createSlice({
  name: "posts",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {
    postAdded: (state, action) => {
      state.items.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Exporting actions and reducer
export const { postAdded } = postsSlice.actions;
export default postsSlice.reducer;
