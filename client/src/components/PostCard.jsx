import { Button } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function PostCard({post}) {
    console.log(post)
  return (
   <div className='max-w-sm'>
       
       <img src={post.image} alt={post.title} className='w-[375px] h-[220px] object-cover ' />
       <div>
        <h3>{post.title}</h3>
       </div>
   </div>
  )
}
