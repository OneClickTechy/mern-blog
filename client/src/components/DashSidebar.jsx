import React from 'react'
import { Sidebar } from "flowbite-react";
import { HiUser } from "react-icons/hi";
import { HiMiniArrowLeftStartOnRectangle } from "react-icons/hi2";
import { useSelector } from 'react-redux';
import { getTab } from '../app/features/dashboardSlice';
import { Link } from 'react-router-dom';
export default function DashSidebar() {
    const tab = useSelector(getTab);
  return (
    <Sidebar className='w-full md:w-56'>
    <Sidebar.Items>
      <Sidebar.ItemGroup>
        <Link to="/dashboard?tab=profile">
        <Sidebar.Item active={tab==='profile'} icon={HiUser} label="User" labelColor="dark" as="div">
          Profile
        </Sidebar.Item>
        </Link>
        <Sidebar.Item icon={HiMiniArrowLeftStartOnRectangle}>
          Sign Out
        </Sidebar.Item>
        
      </Sidebar.ItemGroup>
    </Sidebar.Items>
  </Sidebar>
  )
}
