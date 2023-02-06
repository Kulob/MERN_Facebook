import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import moment from 'moment';
import React from 'react'
import { useState } from 'react';
import { useContext } from 'react';
import { makeRequest } from '../../axios';
import { AuthContext } from "../../context/authContext";
import './comments.scss'

export const Comments = ({postId}) => {
  const [desc, setDesc] = useState("")
  const {currentUser} = useContext(AuthContext)
  
  const { isLoading, error, data } = useQuery(['comments'],
  () => 
  makeRequest.get("/comments?postId="+postId).then((res) => {
    return res.data
  })
  )
  
  const queryClient = useQueryClient()

  const mutation = useMutation(
    (newComment) => {
      return makeRequest.post("/comments", newComment);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["comments"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
    mutation.mutate({ desc, postId });
    setDesc("");
  };

  return (
    <div className='comments'>
      <div className="write">
      <img src={currentUser.profilePic} alt=''/>
      <input type="text" placeholder='write a comments' 
      value={desc}
      onChange={(e) => setDesc(e.target.value)}
      />
      <button onClick={handleClick}>Send</button>
      </div>
      { isLoading ? "Loading..." :
        data.map(comment => (
          <div className="comment">
            <div className="comment_name">
              <img src={comment.profilePic} alt="" />
              <span>{comment.name}</span>
            </div>
            <div className="info">
              <p>{comment.desc}</p>
              <span>{moment(comment.createdAt).fromNow()}</span>
            </div>
          </div>
        ))
      }
    </div>
  )
}
