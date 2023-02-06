import React from 'react'
import './profile.scss'
import { BsFacebook,BsInstagram,BsTwitter,BsLinkedin,BsPinterest } from "react-icons/bs";
import { MdPlace,MdLanguage } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";
import { FiMoreHorizontal } from "react-icons/fi";
import { Posts } from '../../components/posts/Posts';
import { useLocation } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import { useState } from 'react';
import { Update } from '../../components/update/Update';

export const Profile = () => {
  const [openUpdate, setOpenUpdate] = useState(false)
  const {currentUser} = useContext(AuthContext)
   
  const userId = parseInt(useLocation().pathname.split('/')[2])

  const { isLoading, error, data } = useQuery(['user'],
    () => 
    makeRequest.get("/users/find/"+userId).then((res) => {
      return res.data
    })
  )  
  const {isLoading: rIsLoading, data: relationshipData} = useQuery(
    ["relationship"], () => makeRequest.get("/relationships?followedUserId=" + userId)
    .then((res) => {
      return res.data
    })
  )
  const queryClient = useQueryClient()

  const mutation = useMutation((following) => {
    if (following) return makeRequest.delete("/relationships?userId=" + userId)
    return makeRequest.post("/relationships",{userId})
  },
  {
    onSuccess:() => {
      // Invalidate and refetch
      queryClient.invalidateQueries(['relationship'])
    }
  })
  const handleFollow = () => {
    mutation.mutate(relationshipData.includes(currentUser.id))
  }
  

  return (
    <div className="profile">
      {
        isLoading ? 'Loading' : 
        <>
        <div className="images">
        <img src={"/upload/"+data.coverPic} alt="" className="cover" />
        <img src={"/upload/"+data.profilePic} alt="" className="profilePic" />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
            <a href="http://facebook.com">
              <BsFacebook fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <BsInstagram fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <BsTwitter fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <BsLinkedin fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <BsPinterest fontSize="large" />
            </a>
          </div>
          <div className="center">
            <span>{data.name}</span>
            <div className="info">
              <div className="item">
                <MdPlace />
                <span>{data.city}</span>
              </div>
              <div className="item">
                <MdLanguage />
                <span>{data.websity}</span>
              </div>
            </div>
            {rIsLoading ? (
                  "loading"
                ) : userId === currentUser.id ? (
                  <button onClick={() => setOpenUpdate(true)}>update</button>
                ) : (
                  <button onClick={handleFollow}>
                    {relationshipData.includes(currentUser.id)
                      ? "Following"
                      : "Follow"}
                  </button>
                )}
          </div>
          <div className="right">
            <HiOutlineMail />
            <FiMoreHorizontal />
          </div>
        </div>
      <Posts userId ={userId}/>
      </div>
        </>
      }
      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data}/>}
    </div>
  );
}
