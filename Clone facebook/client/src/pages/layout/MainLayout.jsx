import { Outlet } from "react-router-dom";
import React from 'react'
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { LeftBar } from "../../components/leftBar/LeftBar";
import { Navbar } from "../../components/navbar/Navbar";
import { RightBar } from "../../components/rightBar/RightBar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

const MainLayout = () => {
  const {darkMode} = useContext(DarkModeContext)

  return (
    <QueryClientProvider client={queryClient}>

  <div className={`theme-${darkMode ? 'dark' : 'light'}`}>
    <Navbar />
    <div style={{ display: 'flex' }}>
      <LeftBar />
      <div style={{flex: 6}}>

      <Outlet />
      </div>
      <RightBar />
    </div>
  </div>
  </QueryClientProvider>
  )
}

export default MainLayout
