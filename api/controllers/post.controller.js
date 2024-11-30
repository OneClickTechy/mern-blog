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
    res.status(200).json({ message: "Post Created Successfully", post });
  } catch (error) {
    next(error);
  }
};

export const getPosts = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const sortDirection = req.query.sort === "asc" ? 1 : -1;
    const posts = await Post.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } },
          { content: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);
    const totalPosts = await Post.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthPosts = await Post.countDocuments({
      updatedAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({ posts, totalPosts, lastMonthPosts, startIndex });
  } catch (error) {
    next(error);
  }
};
