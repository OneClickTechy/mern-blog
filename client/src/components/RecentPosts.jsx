import React from 'react'
import { useGetPostsQuery } from '../app/service/postApiSlice';
import LoadingPage from './LoadingPage';
import PostCard from './PostCard';

export default function RecentPosts({limit}) {
  const {data, isLoading, isError, error, refetch} = useGetPostsQuery({limit});
  if(isLoading){
    return <LoadingPage />
  }
  if(isError){
    return <div>{error?.data?.message||error.error}</div>
  }

  return (
    <section className='mb-8 max-w-6xl mx-auto'>
      <h1 className="text-2xl font-semibold">Recent Posts</h1>
      <div className="flex flex-wrap justify-center gap-4 mt-8">
        {data && data?.posts?.map((post) => (
          <PostCard post={post} key={post._id} />
        ))}
      </div>
    </section>
  )
}
