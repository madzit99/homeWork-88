import { Box, Grid, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchOnePost } from "../postThunk";
import dayjs from "dayjs";
import { API_URL } from "../../../constants";
import Comments from "../../comments/Comments";
import Preloader from "../../../components/Preloader/Preloader";
import { selectLoading, selectOnePost } from "../postSlice";

const FullPost = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id?: string }>();
  const post = useAppSelector(selectOnePost);
  const loading = useAppSelector(selectLoading);

  const dateFormat = dayjs(post?.date).format("DD/MM/YYYY HH:mm:ss");

  useEffect(() => {
    if (id) {
      dispatch(fetchOnePost(id));
    }
  }, [id, dispatch]);

  let postImage;

  if (post?.image) {
    postImage = API_URL + "/" + post.image;
  }
  return (
    <>
      <Grid container>
        {loading ? (
          <Preloader loading={loading} />
        ) : (
          <Grid
            container
            direction="column"
            sx={{
              bgcolor: "#fff",
              mb: "20px",
              border: "3px solid black",
              borderRadius: "10px",
              py: "20px",
            }}
          >
            <Grid item>
              <Box
                component="img"
                sx={{
                  display: "block",
                  maxWidth: "100%",
                  marginX: "auto",
                }}
                src={postImage}
              />
            </Grid>
            <Grid item sx={{ ml: "30px" }}>
              <Typography variant="h5">
                Автор:{" "}
                <span style={{ fontWeight: "bold" }}>
                  {post?.user.username}
                </span>
              </Typography>
              <Typography variant="h5">
                В: <span style={{ fontWeight: "bold" }}>{dateFormat}</span>
              </Typography>
              <Typography variant="h2" sx={{ fontWeight: "bold" }}>
                {post?.title}
              </Typography>
              <Typography variant="h4">{post?.description}</Typography>
            </Grid>
          </Grid>
        )}
      </Grid>
      <Comments />
    </>
  );
};

export default FullPost;
