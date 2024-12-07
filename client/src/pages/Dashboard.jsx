import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import { useDispatch, useSelector } from 'react-redux';
import { getTab, setTab } from '../app/features/dashboardSlice';
import DashPosts from '../components/DashPosts';
import { useGetUserQuery } from '../app/service/userApiSlice';
import DashUsers from '../components/DashUsers';
import DashComments from '../components/DashComments';

export default function Dashboard() {
  const {data:user}= useGetUserQuery();
  const location = useLocation();
  const tab = useSelector(getTab);
  const dispatch = useDispatch();
  useEffect(() => {
    const URLParams = new URLSearchParams(location.search);
    const tabFromURL = URLParams.get("tab");
    if(tabFromURL){
      dispatch(setTab(tabFromURL));
    }
  },[location.search])
  return (
    <div className='min-h-screen flex flex-col sm:flex-row'>
      {/* Sidebar */}
      <div className="md:w-56">
        <DashSidebar />
      </div>
      {/* Profile */}
        {tab === "profile" && <DashProfile /> }
      {/* Posts */}
        {tab === "posts" && user.isAdmin && <DashPosts user={user}/>}
      {/* Users */}
        {tab === "users" && user.isAdmin && <DashUsers user={user}/>}
      {/* Comments */}
        {tab === "comments" && user.isAdmin && <DashComments user={user}/>}
    </div>
  )
}
