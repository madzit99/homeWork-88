import React, { useState } from "react";
import { Button, Grid, TextField } from "@mui/material";

interface Props {
  postId: string | undefined;
  onSubmit: (message: string, postId: string) => void;
}

const CommentForm: React.FC<Props> = ({ postId, onSubmit }) => {
  const [state, setState] = useState<string>("");

  const submitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(state, postId ? postId : "");
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setState(value);
  };

  return (
    <>
      <form autoComplete="off" onSubmit={submitFormHandler}>
        <Grid container direction="column" spacing={2}>
          <Grid item xs>
            <TextField
              multiline
              rows={3}
              id="message"
              label="Ваше сообщение"
              value={state}
              onChange={inputChangeHandler}
              name="message"
            />
          </Grid>
          <Grid item xs>
            <Button
              type="submit"
              variant="contained"
              sx={{
                mb: 2,
                bgcolor: "#000",
                fontSize: "32px",
                "&:hover": {
                  bgcolor: "#fff",
                  color: "#000",
                },
              }}
            >
              Создать
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default CommentForm;
