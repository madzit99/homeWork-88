import { Box, Grid, Typography, styled } from "@mui/material";
import { Post } from "../../../types";
import dayjs from "dayjs";
import ChatIcon from "../../../assets/chatIcon.webp";
import { NavLink } from "react-router-dom";
import { API_URL } from "../../../constants";

const Link = styled(NavLink)({
  color: "inherit",
  textDecoration: "none",
  "&:hover": {
    color: "inherit",
  },
});

interface Props {
  post: Post;
}

const PostItem: React.FC<Props> = ({ post }) => {
  const dateFormat = dayjs(post.date).format("DD/MM/YYYY HH:mm:ss");

  let cardImage = ChatIcon;

  if (post.image) {
    cardImage = API_URL + "/" + post.image;
  }

  return (
    <>
      <Grid
        item
        container
        sm
        md={4}
        lg={3}
        sx={{
          borderBottom: "3px solid black",
          "&.MuiGrid-container": {
            padding: 0,
          },
        }}
      >
        <Grid item lg={1}>
          <Box
            component="img"
            sx={{
              display: "block",
              width: "auto",
              maxWidth: "100%",
              maxHeight: "100%",
              height: "auto",
              objectFit: "cover",
            }}
            src={cardImage}
          />
        </Grid>
        <Grid item lg={8} container direction="column" sx={{ ml: "30px" }}>
          <Grid item container>
            <Typography variant="h5">{dateFormat}</Typography>
            <Typography variant="h5" sx={{ ml: "20px" }}>
              к {""}
              <span style={{ fontWeight: "bold" }}>{post.user.username}</span>
            </Typography>
          </Grid>
          <Link to={`posts/${post?._id}`}>
            <Typography variant="h2" sx={{ fontWeight: "bold" }}>
              {post?.title}
            </Typography>
          </Link>
        </Grid>
      </Grid>
    </>
  );
};
export default PostItem;
