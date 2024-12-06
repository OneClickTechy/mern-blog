import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetPostsQuery } from '../app/service/postApiSlice';
import LoadingPage from '../components/LoadingPage';
import { Button } from 'flowbite-react';
import { formatDistanceToNow } from 'date-fns'
import { IoMdTime } from "react-icons/io";
import CallToAction from '../components/CallToAction';
import CommentSection from '../components/CommentSection';
import RecentPosts from '../components/RecentPosts';

export default function Post() {
    const {slug} =useParams();
    const navigate = useNavigate();
    const {data, isLoading, isError, error} = useGetPostsQuery({slug});
    const [post, setPost] = useState({});
    useEffect(()=>{
        if(data){
            setPost(data.posts[0])
        }
    },[data])
    console.log(error);
    if(isLoading){
        return <LoadingPage /> 
    }
    if(isError){
        return (
            <div>{error?.data?.message||error.error}</div>
        )
    }
    if(Object.keys(post).length){
        return (
            <main className='max-w-4xl mx-auto p-2 lg:p-0'>
                <h1 className='text-4xl text-center font-bold'>{post.title}</h1>
                <Button onClick={() => {navigate(`/search?category=${post && post.category}`)}} color='gray' className='mx-auto my-8' >{post.category}</Button>
                <img src={post.image} alt={post.title} className='mx-auto bg-gray-500 w-full max-w-md' />
                <div className="flex justify-between mt-8 italic">
                    <span className='flex items-center gap-2'><IoMdTime />{formatDistanceToNow(post.createdAt)} ago.</span>
                    <span>{Math.ceil(post.content.length/1000)} mins read</span>
                </div>
                <hr  className='mt-4 border-gray-900'/>
                <div dangerouslySetInnerHTML={{__html: post.content}} className='content-container'></div>
                <div>
                    <CallToAction />
                </div>
                <CommentSection postId={post._id} />
                <RecentPosts />
            </main>
        )
    }
    

}
