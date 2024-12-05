import React, { useState } from 'react'
import { useGetUserQuery } from '../app/service/userApiSlice';
import { Link } from 'react-router-dom';
import { Alert, Button, Spinner, Textarea } from 'flowbite-react';
import { useCreateCommentMutation } from '../app/service/commentApiSlice';

export default function CommentSection({postId}) {
    const {data:user}=useGetUserQuery();
    const [comment, setComment] = useState("");
    const [createComment, {isLoading, isSuccess, isError, error}]= useCreateCommentMutation();

    const canComment = Boolean(comment.trim() !== "")
    const handleSubmitComment = async (e) => {
        e.preventDefault();
        if(!canComment) return;
        const data = {
            content: comment,
            userId: user._id,
            postId: postId
        }
        await createComment(data);
        setComment("");
    }
  return (
    <div>
        {user ? (
            <div className='max-w-2xl mx-auto my-8'>
                <div className='flex flex-nowrap gap-2 items-center text-gray-500 my-4  w-full max-w-2xl mx-auto text-sm'>
                    <p className='whitespace-nowrap'>Signed In as :</p>
                    <img src={user.profilePicture} className='w-8 h-8 rounded-full object-cover aspect-square' alt={"profile picture"} />
                    <Link to="/dashboard?tab=profile"  className='text-blue-500 hover:text-blue-300 hover:underline'>@{user.username}</Link>
                </div>
                <form className='flex flex-col gap-4 border p-2 border-teal-600' onSubmit={handleSubmitComment}>
            
                    <Textarea placeholder='What do you want to say?' value={comment} onChange={(e)=> setComment(e.target.value)} />
                    <div className='flex justify-between'>
                        <p className="text-gray-500 text-sm">{200 - comment.length} characters remaining</p>
                        <Button type='submit' disabled={!canComment}>{
                            isLoading ? (
                                <>
                                <Spinner size="sm" color="info" /><span>Sending</span>
                                </>
                            ) : "Send"
                    }</Button>
                    </div>
                </form>
                {isError && <Alert color="failure">{error.data.message}</Alert>}
                {isSuccess && <Alert color="success">Comment sent successfully</Alert>}
            </div>
        ) : (
            <div className='flex flex-nowrap gap-2 items-center text-gray-500 my-4  w-full max-w-2xl mx-auto'>
                You must sign in to command
                <Link to="/sign-in" className='text-blue-500 hover:text-blue-300 hover:underline'>Sign In</Link>
            </div>
        )}
    </div>
  )
}
