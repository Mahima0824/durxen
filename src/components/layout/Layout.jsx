import React from 'react';
import TopMenu from './TopMenu';
import LeftSideBar from './LeftSideBar';
import { Outlet } from 'react-router-dom';
import RightSidebar from './RightSidebar';

export default function Layout() {
  return (
    <>
      <TopMenu />
      <LeftSideBar />
      <Outlet />
      <RightSidebar />
    </>
  )
}
