import { Button, FileInput, Select, TextInput } from 'flowbite-react'
import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
export default function CreatePost() {
  return (
    <section className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-4xl font-semibold mt-7'>Create Post</h1>
      <form className='flex flex-col gap-4 mt-7'>

        <div className='flex flex-col gap-4 md:flex-row'>
        <TextInput placeholder='Title' required id="title" className='flex-1' />
        <Select id="category">
          <option value="uncategorized">Select Category</option>
          <option value="reactjs">React JS</option>
          <option value="nodejs">Node JS</option>
          <option value="expressjs">Express JS</option>
        </Select>
        </div>

        <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
          <FileInput 
                    accept='image/*'
                    className='flex-1'
          />
          <Button
            type='button'
            gradientDuoTone='purpleToBlue'
            size='sm'
            outline
          >Upload Image</Button>
        </div>
        <ReactQuill
          theme="snow"
          placeholder='Write something....'
          className="h-72 mb-12"
          required
          />
          <Button type="submit" gradientDuoTone='greenToBlue' >Publish</Button>
      </form>
    </section>
  )
}
