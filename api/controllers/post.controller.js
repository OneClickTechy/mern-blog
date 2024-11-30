import Post from "../models/post.model.js";
import { errorHandler } from "../utils/errorHandler.js";

export const createPost = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    if (!title || !content || title.trim() === "" || content.trim() === "") {
      return next(errorHandler(400, "Title and content are required"));
    }

    const slug = title.replace(/\s+/g, "-").toLowerCase().replace(/\W+/g, "");
    const post = new Post({
      ...req.body,
      slug,
      userId: req.user._id,
    });
    await post.save();
    res.status(200).json({ message: "Post Created Successfully",
      post
     });
  } catch (error) {
    next(error);
  }
};
