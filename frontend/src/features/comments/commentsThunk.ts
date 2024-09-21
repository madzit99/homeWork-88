import { createAsyncThunk } from "@reduxjs/toolkit";
import { Comment } from "../../types";
import axiosApi from "../../axiosApi";
import { RootState } from "../../app/store";

export const fetchComments = createAsyncThunk<Comment[], string>(
  "comments/fetchAll",
  async (postId: string) => {
    const response = await axiosApi.get<Comment[]>(`comments/${postId}`);
    return response.data;
  }
);

interface CommentData {
  postId: string;
  text: string;
}

export const createComment = createAsyncThunk<
  void,
  CommentData,
  { state: RootState }
>("comments/create", async (commentData, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.users.user?.token;

    if (token) {
      await axiosApi.post("/comments", commentData, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }
  } catch (e) {
    console.error(e);
  }
});
