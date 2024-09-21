import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Post } from "../../types";
import { fetchOnePost, fetchPosts } from "./postThunk";

interface postsState {
  posts: Post[];
  singlePost: Post | null;
  fetchLoading: boolean;
  singleFetchLoading: boolean;
}

const initialState: postsState = {
  posts: [],
  singlePost: null,
  fetchLoading: false,
  singleFetchLoading: false,
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchPosts.fulfilled, (state, { payload: posts }) => {
      state.fetchLoading = false;
      state.posts = posts;
    });
    builder.addCase(fetchPosts.rejected, (state) => {
      state.fetchLoading = false;
    });

    builder.addCase(fetchOnePost.pending, (state) => {
      state.singleFetchLoading = true;
    });
    builder.addCase(fetchOnePost.fulfilled, (state, { payload: post }) => {
      state.singleFetchLoading = false;
      state.singlePost = post;
    });
    builder.addCase(fetchOnePost.rejected, (state) => {
      state.singleFetchLoading = false;
    });
  },
});

export const postsReducer = postsSlice.reducer;
export const selectPosts = (state: RootState) => state.posts.posts;
export const selectSinglePost = (state: RootState) => state.posts.singlePost;
export const selectPostsLoading = (state: RootState) =>
  state.posts.fetchLoading;
export const selectSinglePostLoading = (state: RootState) =>
  state.posts.singleFetchLoading;
