import React from 'react'
import "./navbar.scss"
import {AiOutlineHome,AiOutlineSearch,AiOutlineMail} from 'react-icons/ai'
import { BiSun} from 'react-icons/bi'
import {BsGrid,BsFillPersonFill, BsMoon} from 'react-icons/bs'
import {IoMdNotificationsOutline} from 'react-icons/io'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { DarkModeContext } from '../../context/darkModeContext'
import { AuthContext } from '../../context/authContext'


export const Navbar = () => {

  const {toggle,darkMode} = useContext(DarkModeContext)
  const {currentUser} = useContext(AuthContext)


  return (
    <div className='navbar'>
      <div className="left">
        <Link to='/'>
        <span>Mirvon</span>
        </Link>
        <AiOutlineHome/>
        {
          darkMode ?
        <BiSun onClick={toggle}/> : <BsMoon onClick={toggle}/>
        }
        <BsGrid/> 
        <div className="search">
          <AiOutlineSearch/>
          <input type="text" placeholder='Search...'/>
        </div>
      </div>
      <div className="right">
        <BsFillPersonFill/>
        <AiOutlineMail/>
        <IoMdNotificationsOutline/>
        <div className="user">
          <img src={currentUser.profilePic} alt=''/>
          <span>{currentUser.name}</span>
        </div>
      </div>
    </div>
  )
}
