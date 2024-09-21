import { createSlice } from "@reduxjs/toolkit";
import { Comment } from "../../types";
import { fetchComments } from "./commentsThunk";

interface commentsState {
  comments: Comment[];
  fetchLoading: boolean;
}

const initialState: commentsState = {
  comments: [],
  fetchLoading: false,
};

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchComments.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchComments.fulfilled, (state, { payload: comments }) => {
      state.fetchLoading = false;
      state.comments = comments;
    });
    builder.addCase(fetchComments.rejected, (state) => {
      state.fetchLoading = false;
    });
  },
  selectors: {
    selectComments: (state) => state.comments,
    selectCommentsLoading: (state) => state.fetchLoading
  },
});



export const commentsReducer = commentsSlice.reducer;

export const {
  selectComments,
  selectCommentsLoading,
} = commentsSlice.selectors;
