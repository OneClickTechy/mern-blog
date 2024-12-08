import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {AiOutlineSearch} from "react-icons/ai"

import { useGetUserQuery } from '../app/service/userApiSlice'
import ToggleTheme from './ThemeToggler'
import { useSignoutMutation } from '../app/service/authApiSlice'
import { useEffect, useState } from 'react'

export default function Header() {
    const  path = useLocation().pathname;
    const location = useLocation();
    const navigate = useNavigate();
    const {data, isSuccess}= useGetUserQuery();
    const [searchTerm, setSearchTerm]= useState("");
    const [signout]= useSignoutMutation();
    
    const handleSignout = async () => {
      await signout();
    }
    const handleSearch = (e) => {
      e.preventDefault();
      if(searchTerm){
        const URLParams = new URLSearchParams(location.search);
        URLParams.set("searchTerm", searchTerm);
        navigate(`/search?${URLParams.toString()}`);
      }
    }

    useEffect(()=>{
      const URLParams = new URLSearchParams(location.search);
      const searchTermFromURL = URLParams.get("searchTerm");
      if(searchTermFromURL){
        setSearchTerm(searchTermFromURL);
      }
    },[location.search])
  return (
    <Navbar>
        <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-400 rounded-lg text-white'>Mr. JP&apos;S</span>
        Blog
        </Link>
        <form onSubmit={handleSearch}>
            <TextInput placeholder='Search...' type='text' id="search-main" rightIcon={AiOutlineSearch} className='hidden lg:inline' value={searchTerm} onChange={(e)=> setSearchTerm(e.target.value)} />
        </form>
            <Link to="/search">
            <Button color='gray' className='w-12 h-10 lg:hidden' pill><AiOutlineSearch /></Button>
            </Link>
        <div className='flex gap-2 md:order-2'>
          <ToggleTheme />

            {isSuccess && (
                 <Dropdown
                 label={<Avatar alt="User Profile" img={data.profilePicture} rounded />}
                 arrowIcon={false}
                 inline
                 placement='bottom-end'
               >
                
                 <Dropdown.Header>
                   <span className="block text-sm">@{data.username}</span>
                   <span className="block truncate text-sm font-medium">{data.email}</span>
                 </Dropdown.Header>
                  {data.isAdmin && (
                    <Link to="/dashboard?tab=dash">
                      <Dropdown.Item>
                        Dashboard
                      </Dropdown.Item>
                    </Link>
                  )}
                    <Link to="/dashboard?tab=profile">
                 <Dropdown.Item>
                 Profile
                    </Dropdown.Item>
                    </Link>
                 <Dropdown.Divider />
                 <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
               </Dropdown>
            )}
            {!isSuccess && (
                <Link to="/sign-in" className='whitespace-nowrap'>
                <Button gradientDuoTone='purpleToBlue' outline>
                    Sign In
                </Button>
            </Link>
            )}
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
