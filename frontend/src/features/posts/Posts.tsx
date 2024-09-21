import { Grid, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectPosts, selectPostsLoading } from "./postSlice";
import { useEffect } from "react";
import { fetchPosts } from "./postThunk";
import PostItem from "./Components/PostItem";
import Preloader from "../../components/Preloader/Preloader";

const Posts = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);
  const loading = useAppSelector(selectPostsLoading);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <>
      <Typography variant="h3" sx={{ pt: "20px", fontWeight: "bold" }}>
        Последний пост:
      </Typography>
      {loading ? (
        <Preloader loading={loading} />
      ) : (
        <Grid
          item
          container
          direction="column"
          spacing={2}
          sx={{
            mt: "10px",
            border: "3px solid black",
            borderBottom: "0",
            bgcolor: "#fff",
          }}
        >
          {posts.length <= 0 ? (
            <Typography variant="h1" sx={{ borderBottom: "3px solid black" }}>
              Пока нет поста
            </Typography>
          ) : (
            <>
              {posts.map((post) => (
                <PostItem post={post} key={post._id} />
              ))}
            </>
          )}
        </Grid>
      )}
    </>
  );
};

export default Posts;
