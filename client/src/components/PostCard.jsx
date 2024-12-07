import { Button, Card } from 'flowbite-react'
import React from 'react'
import { HiArrowRight } from 'react-icons/hi'
import { Link } from 'react-router-dom'

export default function PostCard({post}) {
  return (
    <div className="max-w-[350px] rounded overflow-hidden shadow-lg border border-gray-900">
      <div className="bg-green-500 w-full h-auto">
        <img className="w-full h-[250px] object-cover" src={[post.image]} alt={post.title} loading='lazy'/>
      </div>
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2 line-clamp-2">{post.title}</div>
    </div>
    <div className="px-6 pt-4 pb-2">
      <Link to={`/post/${post.slug}`}>
      <Button gradientDuoTone='greenToBlue'  className='flex ml-auto'>
        Read More<HiArrowRight className='ml-2 self-center' />
      </Button>
      </Link>
    </div>
  </div>
  )
}
