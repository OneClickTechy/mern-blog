import { Button } from 'flowbite-react'
import React from 'react'

export default function CallToAction() {
  return (
    <div className='flex flex-col gap-4 md:flex-row  sm:p-4 p-2 border border-gray-500 rounded-tr-xl rounded-bl-xl max-w-2xl mx-auto my-4'>
        <div className="flex flex-col items-center">
            <h1 className='text-center text-4xl font-semibold'>Call to action</h1>
            <p className='leading-10'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque ut ea dolores?</p>
            <Button gradientDuoTone='pinkToOrange' className='mx-auto rounded-none rounded-tr-xl rounded-bl-xl '>Click me</Button>
        </div>
        <div className='max-w-sm mx-auto'>
            <img src="https://dummyimage.com/600x400/abcdef/000" alt={"call to action"} />
        </div>
    </div>
  )
}
