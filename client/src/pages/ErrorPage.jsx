import React from 'react'
import { Link } from 'react-router-dom'

export default function ErrorPage() {
  return (
    <div className='min-h-screen flex flex-col justify-center items-center gap-4'>
        <h1 className='text-6xl'>404</h1>
        <h2 className='text-4xl text-red-600 dark:text-red-400'>Page Not Found!!!</h2>
        <Link to="/" className='text-blue-500 hover:text-blue-800 hover:underline focus:text-blue-800 '>Go to HOMEPAGE</Link>
    </div>
  )
}
