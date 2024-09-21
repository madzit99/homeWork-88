import React, { useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
import { PostMutation } from "../../../types";
import FileInput from "../../../UI/FileInput/FileInput";

interface Props {
  onSubmit: (mutation: PostMutation) => void;
}

const PostForm: React.FC<Props> = ({ onSubmit }) => {
  const [state, setState] = useState<PostMutation>({
    title: "",
    description: "",
    image: null,
  });

  const submitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();

    if (!state.description && !state.image) {
      alert("Заполните описание или выберите изображение!");
      return;
    }

    onSubmit(state);
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  return (
    <form autoComplete="off" onSubmit={submitFormHandler}>
      <Grid container direction="column" spacing={2}>
        <Grid item xs>
          <TextField
            id="title"
            label="Загаловок"
            value={state.title}
            onChange={inputChangeHandler}
            name="title"
            required
          />
        </Grid>

        <Grid item xs>
          <TextField
            multiline
            rows={3}
            id="description"
            label="Описание"
            value={state.description}
            onChange={inputChangeHandler}
            name="description"
          />
        </Grid>

        <Grid item xs>
          <FileInput
            label="Картинка"
            name="image"
            onChange={fileInputChangeHandler}
          />
        </Grid>

        <Grid item xs>
          <Button type="submit" color="primary" variant="contained">
            Создать
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default PostForm;
