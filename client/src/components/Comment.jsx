import { useState } from "react";
import {
  useGetUserByIdQuery,
  useGetUserQuery,
} from "../app/service/userApiSlice";
import { BiSolidLike } from "react-icons/bi";
import { useDeleteCommentMutation, useEditCommentMutation, useLikeCommentMutation } from "../app/service/commentApiSlice";
import { Button, Modal, Textarea } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function Comment({ comment }) {
  const { data: commentUser } = useGetUserByIdQuery(comment.userId);
  const { data: user } = useGetUserQuery();
  const [likeComment] = useLikeCommentMutation();
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content||"");
  const [editComment]=useEditCommentMutation();
  const [deleteComment]=useDeleteCommentMutation();
  const [openModal, setOpenModal] = useState(false);

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
  const handleDeleteComment = async () => {
    setOpenModal(false);
    await deleteComment(comment._id);
  };
  return (
    <>
      {comment && (
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
            {commentUser && commentUser.profilePicture ? (
              <img
                src={commentUser.profilePicture}
                className="min-w-10 min-h-10 w-10 h-10 object-cover bg-gray-300 rounded-full"
              />
            ):(
              <img
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                className="min-w-10 min-h-10 w-10 h-10 object-cover bg-gray-300 rounded-full"
              />
            )}
          </div>
          <div className="flex flex-col gap-2 text-gray-700 dark:text-gray-500">
            <span>@{commentUser?.username||"Unknown"} </span>
            <span>{comment.content}</span>

            <div className="flex items-center gap-2">
              <button type="button" onClick={handleLikeComment}>
                <BiSolidLike
                  color={comment.likes.includes(user._id) ? "78B3CE" : "gray"}
                  size={20}
                />
              </button>
              <p className="">
                {comment && comment.numberOfLikes > 0 && comment.numberOfLikes}
                {comment && comment.numberOfLikes > 0
                  ? comment.numberOfLikes === 1
                    ? " like"
                    : " likes"
                  : null}
              </p>
              <div className="flex gap-2">
                {user._id === commentUser?._id && (
                  <button
                    type="button"
                    className=" text-slate-600 dark:text-slate-500 hover:underline hover:text-slate-50 dark:hover:text-slate-50"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit
                  </button>
                )}
                {(user._id === commentUser?._id || user.isAdmin) && (
                  <button
                    type="button"
                    className=" text-slate-600 dark:text-slate-500 hover:underline hover:text-red-500 dark:hover:text-red-400"
                    onClick={() => setOpenModal(true)}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          </div>
          
        </div>
        )}
        <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this comment?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteComment}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
        </>
        
      )}
    </>
  );
}
