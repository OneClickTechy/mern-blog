import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth';
import { useSignupMutation } from '../app/service/authApiSlice';

export default function Signup() {
  const [formData, setFormData] = useState({
    username: "", email: "", password: ""
  });
  const [signup, { isLoading, isSuccess, isError, error }] = useSignupMutation();
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });  
  }
  const canSignup = Boolean(formData.username && formData.email && formData.password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!canSignup){
      return
    }
    const userInfo = formData;
    await signup(userInfo);
    navigate("/sign-in")
  }
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
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="username" value="Your username" />
          <TextInput id="username" type="text" placeholder="Your username" onChange={handleChange} value={formData.username} />
        </div>
        <div>
          <Label htmlFor="email" value="Your email" />
          <TextInput id="email" type="email" placeholder="name@gmail.com" onChange={handleChange} value={formData.email} />
        </div>
        <div>
          <Label htmlFor="password" value="Your password" />
          <TextInput id="password" type="password" placeholder="********" onChange={handleChange} value={formData.password} />
        </div>
        <Button className='mt-4' gradientDuoTone="purpleToBlue" type='submit' disabled={isLoading||!canSignup}>{isLoading?
        (<>
          <Spinner />
          <span className='ml-2'>Loading....</span>
          </>
        )
        :"Sign Up"}</Button>
        <OAuth />
      </form>
      <div className='text-sm mt-5 flex gap-2'>
        <span>Have an account?</span>
        <Link to="/sign-in" className='text-blue-500'>Sign In</Link>
      </div>
      {isError && <Alert color="failure">{error.message}</Alert>}
      {isSuccess && <Alert color="success">User Created Successfully</Alert>}
    </div>
    </div>
   </section>
  )
}
