import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import { useDispatch, useSelector } from 'react-redux';
import { getTab, setTab } from '../app/features/dashboardSlice';

export default function Dashboard() {
  const location = useLocation();
  const tab = useSelector(getTab);
  const dispatch = useDispatch();
  useEffect(() => {
    const URLParams = new URLSearchParams(location.search);
    const tabFromURL = URLParams.get("tab");
    if(tabFromURL){
      dispatch(setTab(tabFromURL));
    }
    console.log(tabFromURL, tab)
  },[location.search])
  return (
    <div className='min-h-screen flex flex-col sm:flex-row'>
      {/* Sidebar */}
      <div className="md:w-56">
        <DashSidebar />
      </div>
      {/* Profile */}
      
        {tab === "profile" && <DashProfile /> }
    </div>
  )
}
