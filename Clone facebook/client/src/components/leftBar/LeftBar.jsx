import React from 'react'
import './leftBar.scss'
import { FaUserFriends } from "react-icons/fa";
import { MdGroups,MdEmojiEvents,MdOutlineMessage } from "react-icons/md";
import { SiMarketo,SiTutanota } from "react-icons/si";
import { BsFillStopwatchFill,BsFillCollectionPlayFill,BsFillCameraVideoFill } from "react-icons/bs";
import { RiGalleryFill } from "react-icons/ri";
import { AiFillFund } from "react-icons/ai";
import { FaDiscourse,FaGamepad } from "react-icons/fa";
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';

export const LeftBar = () => {
  const {currentUser} = useContext(AuthContext)
  return (
      <div className="leftBar">
        <div className="container">
          <div className="menu">
            <div className="user">
          <img src={currentUser.profilePic} alt=''/>
              <span>{currentUser.name}</span>
            </div>
            <div className="item">
            <FaUserFriends style={{width: '30px',height:'30px',color:'blue'}}/>
              <span>Friends</span>
            </div>
            <div className="item">
            <MdGroups style={{width: '30px',height:'30px',color:'blue'}}/>
              <span>Groups</span>
            </div>
            <div className="item">
            <SiMarketo style={{width: '30px',height:'30px',color:'blue'}}/>
              <span>Marketplace</span>
            </div>
            <div className="item">
              <BsFillCollectionPlayFill style={{width: '30px',height:'30px',color:'blue'}}/>
              <span>Watch</span>
            </div>
            <div className="item">
              <BsFillStopwatchFill style={{width: '30px',height:'30px',color:'blue'}}/>
              <span>Memories</span>
            </div>
          </div>
          <hr />
          <div className="menu">
            <span>Your shortcuts</span>
            <div className="item">
              <MdEmojiEvents style={{width: '30px',height:'30px',color:'blue'}}/>
              <span>Events</span>
            </div>
            <div className="item">
              <FaGamepad style={{width: '30px',height:'30px',color:'blue'}}/>
              <span>Gaming</span>
            </div>
            <div className="item">
              <RiGalleryFill style={{width: '30px',height:'30px',color:'blue'}}/>
              <span>Gallery</span>
            </div>
            <div className="item">
              <BsFillCameraVideoFill style={{width: '30px',height:'30px',color:'blue'}}/>
              <span>Videos</span>
            </div>
            <div className="item">
              <MdOutlineMessage style={{width: '30px',height:'30px',color:'blue'}}/>
              <span>Messages</span>
            </div>
          </div>
          <hr />
          <div className="menu">
            <span>Others</span>
            <div className="item">
              <AiFillFund style={{width: '30px',height:'30px',color:'blue'}}/>
              <span>Fundraiser</span>
            </div>
            <div className="item">
              <SiTutanota style={{width: '30px',height:'30px',color:'blue'}}/>
              <span>Tutorials</span>
            </div>
            <div className="item">
              <FaDiscourse style={{width: '30px',height:'30px',color:'blue'}}/>
              <span>Courses</span>
            </div>
          </div>
        </div>
      </div>
  
  )
}
