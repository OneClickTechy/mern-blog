import React from 'react'
import { Button, Navbar, TextInput } from 'flowbite-react'
import { Link, useLocation } from 'react-router-dom'
import {AiOutlineSearch} from "react-icons/ai"
import {FaMoon} from "react-icons/fa"

export default function Header() {
    const  path = useLocation().pathname;
  return (
    <Navbar>
        <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-400 rounded-lg text-white'>Mr. JP'S</span>
        Blog
        </Link>
        <form>
            <TextInput placeholder='Search...' type='text' rightIcon={AiOutlineSearch} className='hidden lg:inline' />
        </form>
        <Button color='gray' className='w-12 h-10 lg:hidden' pill><AiOutlineSearch /></Button>
        <div className='flex gap-2 md:order-2'>
            <Button className='w-12 h-10 hidden sm:inline' color='gray' pill>
                <FaMoon />
            </Button>

            <Link to="/sign-in" className='whitespace-nowrap'>
                <Button gradientDuoTone='purpleToBlue' outline>
                    Sign In
                </Button>
            </Link>
            <Navbar.Toggle />
        </div>
            <Navbar.Collapse>
                <Navbar.Link active={path === "/"} as={'div'}>
                    <Link to="/">HOME</Link>
                </Navbar.Link>
                <Navbar.Link active={path==="/about"} as={'div'}>
                    <Link to="/about" >ABOUT</Link>
                </Navbar.Link>
                <Navbar.Link active={path==="/projects"} as={'div'}>
                    <Link to="/projects" >PROJECTS</Link>
                </Navbar.Link>
            </Navbar.Collapse>
    </Navbar>
  )
}
