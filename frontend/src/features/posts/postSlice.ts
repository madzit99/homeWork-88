import { createSlice } from "@reduxjs/toolkit";
import { Post } from "../../types";
import { fetchOnePost, fetchPosts } from "./postThunk";

interface postsState {
  posts: Post[];
  singlePost: Post | null;
  loading: boolean;
  error: boolean;
}
const initialState: postsState = {
  posts: [],
  singlePost: null,
  loading: false,
  error: false,
};
export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fetchPosts.fulfilled, (state, { payload: posts }) => {
      state.loading = false;
      state.posts = posts;
    });
    builder.addCase(fetchPosts.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(fetchOnePost.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchOnePost.fulfilled, (state, { payload: post }) => {
      state.loading = false;
      state.singlePost = post;
    });
    builder.addCase(fetchOnePost.rejected, (state) => {
      state.loading = false;
    });
  },
  selectors: {
    selectPosts: (state) => state.posts,
    selectOnePost: (state) => state.singlePost,
    selectLoading: (state) => state.loading,
    selectError: (state) => state.error,
  },
});
export const postsReducer = postsSlice.reducer;
export const { selectPosts, selectOnePost, selectLoading, selectError } =
  postsSlice.selectors;
