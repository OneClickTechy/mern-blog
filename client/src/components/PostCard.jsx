import { Button} from 'flowbite-react'
import { HiArrowRight } from 'react-icons/hi'
import { Link, useNavigate } from 'react-router-dom'

export default function PostCard({post}) {
  const navigate = useNavigate();
  return (
    <div className="max-w-[350px] rounded overflow-hidden shadow-lg border border-gray-900">
        <img className="bg-green-500 w-full min-w-[350px] h-[250px] object-cover" src={[post.image]} alt={post.title} loading='lazy'/>
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2 line-clamp-2">{post.title}</div>
    </div>
    <Link className='ml-8 text-blue-700 hover:underline dark:text-blue-500' to={`/search?category=${post.category}`}>{post.category}</Link>
    <div className="px-6 pt-4 pb-2">
      <Link to={`/post/${post.slug}`}>
      <Button gradientDuoTone='greenToBlue'  className='flex ml-auto' >
        Read More<HiArrowRight className='ml-2 self-center' />
      </Button>
      </Link>
    </div>
  </div>
  )
}
