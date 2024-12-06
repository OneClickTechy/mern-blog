import Comment from "../models/comment.model.js";
import { errorHandler } from "../utils/errorHandler.js";

export const createComment = async (req, res, next) => {
    try {
        const {content, userId, postId} = req.body;
        const {_id:commenterId} = req.user;

        if(!content || !userId || !postId || content.trim() === "" || userId.trim() === "" || postId.trim() === ""){
            return errorHandler(400, "All fields are required");
        }
        if(userId !== commenterId.toString()){
            return errorHandler(403, "You can only comment on your own post");
        }
        const comment = new Comment({
            content,
            userId,
            postId
        });
        await comment.save();
        res.status(200).json({message: "Comment created successfully", comment});
    } catch (error) {
        next(error)
    }
}
export const getComments = async (req, res, next) => {
    try {
        const {postId} = req.params;
        const comments = await Comment.find({postId}).sort({createdAt: -1});
        if(!comments){
            return next(errorHandler(404, "Comments not found"));
        }
        res.status(200).json(comments);
    } catch (error) {
        next(error)
    }
}

export const likeComment = async (req, res, next) => {
    const {commentId} = req.params;

    const comment = await Comment.findById(commentId);
    if(!comment){
        return next(errorHandler(404, "Comment not found"));
    }
    const findIndexOfUser = comment.likes.indexOf(req.user._id);
    if(findIndexOfUser === -1){
        comment.likes.push(req.user._id);
        comment.numberOfLikes = comment.likes.length;
    }else{
        comment.likes.splice(findIndexOfUser, 1);
        comment.numberOfLikes =comment.likes.length;
    }
    await comment.save();
        res.status(200).json({message: "Comment liked successfully", comment});
}

export const editComment = async (req, res, next) => {
   try {
     const {commentId} = req.params;
     const {content} = req.body;
     const comment = await Comment.findById(commentId);
     if(!comment){
         return next(errorHandler(404, "Comment not found"));
     }
     if(comment.userId !== String(req.user._id)){
        return next(errorHandler(403, "You can only edit your own comment"));
     }
     comment.content = content;
     await comment.save();
     res.status(200).json({message: "Comment edited successfully", comment});
   } catch (error) {
        next(error)
   }
}

export const deleteComment = async (req, res, next) => {
  try {
    const {commentId} = req.params;
    

    const comment = await Comment.findById(commentId);
    if(!comment){
        return next(errorHandler(404, "Comment not found"));
    }
    if(comment.userId !== String(req.user._id) && !req.user.isAdmin){
        return next(errorHandler(403, "You can only delete your own comment"));
    }
    await Comment.findByIdAndDelete(commentId);

    res.status(200).json({message: "Comment deleted successfully"});
  } catch (error) {
    next(error)
  }
}