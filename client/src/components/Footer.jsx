import { Footer } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter, BsYoutube } from "react-icons/bs";
export default function Footercom() {
  return (
     <Footer container className='border border-t-4 border-teal-500'>
     <div className="w-full">
       <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
         <div>
         <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-400 rounded-lg text-white'>Mr. JP&apos;S</span>
        Blog
        </Link>
         </div>
         <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6 mt-8">
           <div>
             <Footer.Title title="about" />
             <Footer.LinkGroup col>
               <Footer.Link href="#">Company</Footer.Link>
               <Footer.Link href="#">Office</Footer.Link>
             </Footer.LinkGroup>
           </div>
           <div>
             <Footer.Title title="Follow us" />
             <Footer.LinkGroup col>
               <Footer.Link href="#">Github</Footer.Link>
               <Footer.Link href="#">Discord</Footer.Link>
             </Footer.LinkGroup>
           </div>
           <div>
             <Footer.Title title="Legal" />
             <Footer.LinkGroup col>
               <Footer.Link href="#">Privacy Policy</Footer.Link>
               <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
             </Footer.LinkGroup>
           </div>
         </div>
       </div>
       <Footer.Divider />
       <div className="w-full sm:flex sm:items-center sm:justify-between">
         <Footer.Copyright href="#" by="Jeyapandi's Blog" year={new Date().getFullYear()} />
         <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
           <Footer.Icon href="#" icon={BsFacebook} />
           <Footer.Icon href="#" icon={BsInstagram} />
           <Footer.Icon href="#" icon={BsTwitter} />
           <Footer.Icon href="#" icon={BsGithub} />
           <Footer.Icon href="#" icon={BsYoutube} />
         </div>
       </div>
     </div>
   </Footer>
  )
}
