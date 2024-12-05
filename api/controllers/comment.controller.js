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