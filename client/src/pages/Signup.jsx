import { Button, Label, TextInput } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Signup() {
  return (
   <section className='mt-20 min-h-screen'>
<div className='p-2 flex flex-col gap-4 sm:flex-row sm:items-center max-w-3xl mx-auto'>
    <div className='flex-1'>
    <Link to="/" className='text-4xl font-bold dark:text-white'>
        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-400 rounded-lg text-white'>Mr. JP'S</span>
        Blog
        </Link>
        <p className="text-sm mt-4 text-gray-500">This is a demo project. You can sign up with your email and password or with Google.</p>
    </div>
    <div className='flex-1'>
      <form className='flex flex-col gap-4'>
        <div>
          <Label htmlFor="username" value="Your username" />
          <TextInput id="username" type="text" placeholder="Your username" />
        </div>
        <div>
          <Label htmlFor="email" value="Your email" />
          <TextInput id="email" type="text" placeholder="name@gmail.com" />
        </div>
        <div>
          <Label htmlFor="password" value="Your password" />
          <TextInput id="password" type="text" placeholder="password" />
        </div>
        <Button className='mt-4' gradientDuoTone="purpleToBlue" type='submit'>Sign Up</Button>
      </form>
      <div className='text-sm mt-5 flex gap-2'>
        <span>Have an account?</span>
        <Link to="/sign-in" className='text-blue-500'>Sign In</Link>
      </div>
    </div>
    </div>
   </section>
  )
}
