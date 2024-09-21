import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { useEffect } from "react";
import { selectLoading, selectPosts } from "./postSlice";
import { Grid, Typography } from "@mui/material";
import Preloader from "../../components/Preloader/Preloader";
import PostItem from "./Components/PostItem";
import { fetchPosts } from "./postThunk";

const Posts = () => {
  const dispatch = useAppDispatch();
  const posts = useSelector(selectPosts);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <>
      <Typography variant="h3" sx={{ pt: "20px", fontWeight: "bold" }}>
        Посты:
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
              Нет постов
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
