import React, { useState } from "react";
import { useGetUserQuery } from "../app/service/userApiSlice";
import { Link } from "react-router-dom";
import { Alert, Button, Spinner, Textarea, Toast } from "flowbite-react";
import {
  useCreateCommentMutation,
  useGetCommentsQuery,
} from "../app/service/commentApiSlice";
import Comment from "./Comment";3
import {HiCheck} from "react-icons/hi"

export default function CommentSection({ postId }) {
  const { data: user } = useGetUserQuery();
  const [comment, setComment] = useState("");
  const [createComment, { isLoading, data, isSuccess, isError, error }] =
    useCreateCommentMutation();
  const {
    data: comments,
    isLoading: isCommentsLoading,
    isSuccess: isCommentsSuccess,
    isError: isCommentsError,
    error: commentsError,
  } = useGetCommentsQuery(postId);
  console.log(comments, commentsError);
  const canComment = Boolean(comment.trim() !== "");
  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!canComment) return;
    const data = {
      content: comment,
      userId: user._id,
      postId: postId,
    };
    await createComment(data);
    setComment("");
  };
  return (
    <div>
      {user ? (
        <div className="max-w-2xl mx-auto my-8">
          <div className="flex flex-nowrap gap-2 items-center text-gray-500 my-4  w-full max-w-2xl mx-auto text-sm">
            <p className="whitespace-nowrap">Signed In as :</p>
            <img
              src={user.profilePicture}
              className="w-8 h-8 rounded-full object-cover aspect-square"
              alt={"profile picture"}
            />
            <Link
              to="/dashboard?tab=profile"
              className="text-blue-500 hover:text-blue-300 hover:underline"
            >
              @{user.username}
            </Link>
          </div>
          <form
            className="flex flex-col gap-4 border p-2 border-teal-600"
            onSubmit={handleSubmitComment}
          >
            <Textarea
              placeholder="What do you want to say?"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <div className="flex justify-between">
              <p className="text-gray-500 text-sm">
                {200 - comment.length} characters remaining
              </p>
              <Button type="submit" disabled={!canComment}>
                {isLoading ? (
                  <>
                    <Spinner size="sm" color="info" />
                    <span>Sending</span>
                  </>
                ) : (
                  "Send"
                )}
              </Button>
            </div>
            {isError && <Alert color="failure">{error.data.message}</Alert>}
            {isSuccess &&  <Toast>
        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
          <HiCheck className="h-5 w-5" />
        </div>
        <div className="ml-3 text-sm font-normal">{data.message}</div>
        <Toast.Toggle />
      </Toast>}
          </form>
          {isCommentsSuccess &&
            (comments.length === 0 ? (
              <div>
                <p className="text-center text-gray-500">No comments yet</p>
              </div>
            ) : (
              <section className="mt-8">
                <h3 className="text-xl flex items-center">Comments:<span className="border px-2 py-1 rounded-md ml-2">{comments.length}</span></h3>
                <div className="my-8 flex flex-col gap-2 ">
                {comments.map((comment) => (
                  <Comment key={comment._id} comment={comment} />
                ))}
                </div>
              </section>
            ))}
          {isCommentsLoading && (
            <div className="flex justify-center">
              <Spinner size="xl" color="info" />
              <p className="ml-4">Loading...</p>
            </div>
          )}
          {isCommentsError && (
            <Alert color="failure">{commentsError.data.message}</Alert>
          )}
        </div>
      ) : (
        <div className="flex flex-nowrap gap-2 items-center text-gray-500 my-4  w-full max-w-2xl mx-auto">
          You must sign in to command
          <Link
            to="/sign-in"
            className="text-blue-500 hover:text-blue-300 hover:underline"
          >
            Sign In
          </Link>
        </div>
      )}
    </div>
  );
}
