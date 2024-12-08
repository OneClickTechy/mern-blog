import Post from "../models/post.model.js";
import { errorHandler } from "../utils/errorHandler.js";

export const createPost = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    if (!title || !content || title.trim() === "" || content.trim() === "") {
      return next(errorHandler(400, "Title and content are required"));
    }

    const generateSlug = (title) => {
      return title
        .trim() // Remove leading and trailing whitespace
        .toLowerCase() // Convert to lowercase
        .replace(/[^a-z0-9\s-]/g, "") // Remove non-alphanumeric characters except spaces and hyphens
        .replace(/\s+/g, "-") // Replace spaces with hyphens
        .replace(/-+/g, "-"); // Remove consecutive hyphens
    };
    const slug = generateSlug(title);
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
    const { _id: userId } = req.user;
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
      updatedAt: { $gte: oneMonthAgo }
    });
    res.status(200).json({ posts, totalPosts, lastMonthPosts, startIndex });
  } catch (error) {
    next(error);
  }
};
export const getPostsPublic = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const sortDirection = req.query.sort === "asc" ? 1 : -1;
    const queryConditions = {
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
    }
    const posts = await Post.find(queryConditions)
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);
    const totalPosts = await Post.countDocuments(queryConditions);
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthPosts = await Post.countDocuments({
      updatedAt: { $gte: oneMonthAgo },
    });
    res.status(200).json({ posts, totalPosts, lastMonthPosts });
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  const { postId } = req.params;
  const { _id:userId } = req.user;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return next(errorHandler(404, "Post not found"));
    }
    if (post.userId.toString() !== userId.toString()) {
      return next(errorHandler(403, "You cannot delete this post"));
    }
    await post.deleteOne();
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    next(error)
  }
}

export const updatePost = async (req, res, next) => {
  const { postId } = req.params;
  const { _id:userId } = req.user;
  const {title, content, category, image}= req.body;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return next(errorHandler(404, "Post not found"));
    }
    if (post.userId.toString() !== userId.toString()) {
      return next(errorHandler(403, "You cannot update this post"));
    }
    const generateSlug = (title) => {
      return title
        .trim() // Remove leading and trailing whitespace
        .toLowerCase() // Convert to lowercase
        .replace(/[^a-z0-9\s-]/g, "") // Remove non-alphanumeric characters except spaces and hyphens
        .replace(/\s+/g, "-") // Replace spaces with hyphens
        .replace(/-+/g, "-"); // Remove consecutive hyphens
    };
    const slug = generateSlug(title);    
    const postUpdated = await Post.findByIdAndUpdate(postId, {
      title,
      content, 
      category,
      image,
      slug,
    },{new: true});
    res.status(200).json({ message: "Post updated successfully", post: postUpdated  });
  } catch (error) {
    next(error)
  }
}
