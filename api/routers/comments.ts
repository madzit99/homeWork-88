import express from "express";
import Comment from "../models/Comment";
import { imagesUpload } from "../multer";
import auth, { RequestWithUser } from "../middleware/auth";
import mongoose from "mongoose";

const commentsRouter = express.Router();

commentsRouter.get("/:id", async (req, res, next) => {
  try {
    const postId = req.params.id;
    const comments = await Comment.find({ postId: postId }).populate(
      "user",
      "username"
    );
    return res.send(comments);
  } catch (error) {
    return next(error);
  }
});

commentsRouter.post(
  "/",
  auth,
  async (req: RequestWithUser, res, next) => {
    try {
      if (!req.user) {
        res.status(401).send({ error: "Unauthorized." });
      }

      const commentData = {
        userId: req.user?._id,
        postId: req.body.postId,
        text: req.body.text,
      };

      const comment = new Comment(commentData);
      await comment.save();

      return res.send(comment);
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        return res.status(400).send(error);
      }

      return next(error);
    }
  }
);


export default commentsRouter;