import { Card, CardContent, Grid, Typography } from "@mui/material";
import { Comment } from "../../../types";

interface Props {
  comment: Comment;
}

const CommentItem: React.FC<Props> = ({ comment }) => (
  <Grid item>
    <Card variant="outlined" style={{ marginBottom: "16px" }}>
      <CardContent>
        <Typography variant="h6" component="h2">
          {comment.user.username}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {comment.text}
        </Typography>
      </CardContent>
    </Card>
  </Grid>
);

export default CommentItem;
