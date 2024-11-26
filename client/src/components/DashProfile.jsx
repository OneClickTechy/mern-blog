import React from 'react'
import {useGetUserQuery} from '../app/service/userApiSlice'
import { Button, TextInput } from 'flowbite-react';
export default function DashProfile() {
  const {data, isSuccess}= useGetUserQuery();
  return (
    <div className='max-w-lg mx-auto w-full p-3'>
      <h1 className='my-7 text-center text-3xl font-semibold'>Profile</h1>
      <form className='flex flex-col gap-4 '>
        <div className='self-center  rounded-full overflow-hidden border-4 border-gray-30'>
          <img src={data.profilePicture} alt="user profile picture" className='0 w-full h-full object-cover '  />
        </div>
        <TextInput placeholder='Username' defaultValue={data.username} id='username' />
        <TextInput placeholder='Email' defaultValue={data.email} id="email" />
        <TextInput placeholder='password' id="password"  />
        <Button type="submit" gradientDuoTone='purpleToBlue' outline>Update</Button>
        <div className='flex justify-between text-red-500'>
          <span className='cursor-pointer'>Delete Account</span><span className='cursor-pointer'>Sign out</span>
        </div>
      </form>
    </div>
  )
}
