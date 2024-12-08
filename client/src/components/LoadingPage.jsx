import { Spinner } from 'flowbite-react'

export default function LoadingPage({content="Loading..., please wait"}) {
  return (
    <div className='flex justify-center items-center h-screen w-full'>
        <Spinner  size="xl" color="info" />
        <p className='ml-4'>{content}</p>
    </div>
  )
}
