import React from "react";
import { useGetUserByIdQuery, useGetUserQuery } from "../app/service/userApiSlice";
import { BiSolidLike } from "react-icons/bi";
import { useLikeCommentMutation } from "../app/service/commentApiSlice";

export default function Comment({ comment }) {
  const { data: commentUser } = useGetUserByIdQuery(comment.userId);
  const {data:user}= useGetUserQuery();
  const [likeComment] = useLikeCommentMutation();
  const handleLikeComment = async() => {
    await likeComment(comment._id);
  }
  return (
    <>
      {comment && commentUser && (
        <div className="flex gap-2  text-gray-300">
          <div>
            <img
              src={commentUser.profilePicture}
              className="min-w-10 min-h-10 w-10 h-10 object-cover bg-gray-300 rounded-full"
            />
          </div>
          <div className="flex flex-col gap-2">
            <span>@{commentUser.username}</span>
            <span>{comment.content}</span>
          <div className="flex items-center gap-2">
            <button type="button" onClick={handleLikeComment}><BiSolidLike color={comment.likes.includes(user._id) ? "78B3CE" : "gray"} size={20}  /></button>
            <p className="text-gray-500">{comment && comment.numberOfLikes>0 && comment.numberOfLikes}{comment && comment.numberOfLikes>0 ? (comment.numberOfLikes===1 ? " like" : " likes") : null}</p>
          </div>
          </div>
        </div>
      )}
    </>
  );
}
