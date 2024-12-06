import { useState } from "react";
import {
  useGetUserByIdQuery,
  useGetUserQuery,
} from "../app/service/userApiSlice";
import { BiSolidLike } from "react-icons/bi";
import { useEditCommentMutation, useLikeCommentMutation } from "../app/service/commentApiSlice";
import { Button, Textarea } from "flowbite-react";

export default function Comment({ comment }) {
  const { data: commentUser } = useGetUserByIdQuery(comment.userId);
  const { data: user } = useGetUserQuery();
  const [likeComment] = useLikeCommentMutation();
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content||"");
  const [editComment]=useEditCommentMutation();

  const handleLikeComment = async () => {
    await likeComment(comment._id);
  };
 
  const handleEditComment = async () => {
    const data = {
      commentId: comment._id,
      content: editedContent,
    }
    await editComment(data);
    setIsEditing(false);
  }
  return (
    <>
      {comment && commentUser && (
        <>
        {isEditing ? (
          <div>
            <Textarea value={editedContent} onChange={(e) => setEditedContent(e.target.value)}/>
            <div className="flex justify-end gap-2 mt-2">
              <Button gradientDuoTone="greenToBlue" type="button" onClick={handleEditComment}>Save</Button>
              <Button onClick={() => setIsEditing(false)} color="failure">Cancel</Button>
            </div>
          </div>
        ):(
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
              <button type="button" onClick={handleLikeComment}>
                <BiSolidLike
                  color={comment.likes.includes(user._id) ? "78B3CE" : "gray"}
                  size={20}
                />
              </button>
              <p className="text-gray-500">
                {comment && comment.numberOfLikes > 0 && comment.numberOfLikes}
                {comment && comment.numberOfLikes > 0
                  ? comment.numberOfLikes === 1
                    ? " like"
                    : " likes"
                  : null}
              </p>
              <div className="flex gap-2">
                {user._id === commentUser._id && (
                  <button
                    type="button"
                    className=" text-slate-400 hover:underline hover:text-slate-50"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit
                  </button>
                )}
                {(user._id === commentUser._id || user.isAdmin) && (
                  <button
                    type="button"
                    className=" text-slate-400 hover:underline hover:text-slate-50"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        )}
        
        </>
        
      )}
    </>
  );
}
