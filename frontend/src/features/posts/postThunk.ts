import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import { Post, PostMutation } from "../../types";
import { RootState } from "../../app/store";

export const fetchPosts = createAsyncThunk<Post[]>(
  "posts/fetchAll",
  async () => {
    const response = await axiosApi.get<Post[]>("/posts");
    return response.data;
  }
);

export const fetchOnePost = createAsyncThunk<Post, string>(
  "posts/fetchOne",
  async (postId: string) => {
    const response = await axiosApi.get<Post>(`/posts/${postId}`);
    return response.data;
  }
);

export const createPost = createAsyncThunk<
  void,
  PostMutation,
  { state: RootState }
>("dishes/create", async (postMutation, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.users.user?token;

    if (token) {
      const formData = new FormData();

      Object.entries(postMutation).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formData.append(key, value as string);
        }
      });

      await axiosApi.post("/posts", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }
  } catch (e) {
    console.error(e);
  }
});
