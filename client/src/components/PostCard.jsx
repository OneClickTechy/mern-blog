import { Button, Card } from 'flowbite-react'
import React from 'react'
import { HiArrowRight } from 'react-icons/hi'
import { Link } from 'react-router-dom'

export default function PostCard({post}) {
    console.log(post)
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg border border-gray-900">
    <img className="w-full h-[250px] object-cover" src={[post.image]} alt={post.title} />
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2 line-clamp-2">{post.title}</div>
    </div>
    <div className="px-6 pt-4 pb-2">
      <Button color="indigo" as={Link} to={`/post/${post.slug}`}  className='flex'>
        Read More<HiArrowRight className='ml-2 self-center' />
      </Button>
    </div>
  </div>
  )
}
