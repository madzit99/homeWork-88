import express from "express";
import mongoose from "mongoose";
import { imagesUpload } from "../multer";
import Post from "../models/Post";
import auth, { RequestWithUser } from "../middleware/auth";

const postsRouter = express.Router();

postsRouter.get("/", async (req, res, next) => {
  try {
    const post = await Post.find();
    return res.send(post);
  } catch (error) {
    return next(error);
  }
});
postsRouter.post("/", auth, imagesUpload.single("image"), async (req:RequestWithUser, res, next) => {
  try {

    if (!req.user) {
        res.status(401).send({error:"Unauthorized."})
    }

    const postData = {
      user: req.user?._id,
      title: req.body.title,
      description: req.body.description,
      image: req.file ? req.file.filename : null,
      date: req.body.date,
    };

    const post = new Post(postData);
    await post.save();

    return res.send(post);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }

    return next(error);
  }
});

export default postsRouter;
