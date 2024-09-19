import mongoose, { Schema, Types, model } from "mongoose";
import User from "./User";

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const category = await User.findById(value);
        return Boolean(category);
      },
      message: "User does not exist",
    },
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  date: {
    type: Date,
  }
});

const Post = model("Post", PostSchema);

export default Post;
