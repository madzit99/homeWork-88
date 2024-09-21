import { Grid } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectComments, selectCommentsLoading } from "./commentsSlice";
import { useEffect } from "react";
import { createComment, fetchComments } from "./commentsThunk";
import CommentItem from "./Components/CommentItem";
import CommentForm from "./Components/CommentForm";
import Preloader from "../../components/Preloader/Preloader";
import { selectUser } from "../users/usersSlice";
import { selectOnePost } from "../posts/postSlice";

const Comments = () => {
  const dispatch = useAppDispatch();
  const comments = useAppSelector(selectComments);
  const post = useAppSelector(selectOnePost);
  const user = useAppSelector(selectUser);
  const loading = useAppSelector(selectCommentsLoading);

  const postId = post?._id;

  useEffect(() => {
    if (postId) {
      dispatch(fetchComments(postId));
    }
  }, [dispatch, postId]);

  const onCommentFormSubmit = async (text: string) => {
    try {
      if (postId) {
        await dispatch(createComment({ text, postId })).unwrap();
        await dispatch(fetchComments(postId));
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      {loading ? (
        <Preloader loading={loading} />
      ) : (
        <Grid container direction="column">
          {user && (
            <CommentForm postId={postId} onSubmit={onCommentFormSubmit} />
          )}
          <Grid container direction="column">
            {comments.map((comment) => (
              <CommentItem comment={comment} key={comment._id} />
            ))}
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Comments;
