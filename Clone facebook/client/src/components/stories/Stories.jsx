import React from 'react'
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import './stories.scss'

export const Stories = () => {
  const {currentUser} = useContext(AuthContext)

  const stories = [
    {
      id: 1,
      name: "John Doe",
      img: "https://avatars.mds.yandex.net/i?id=1fdcb8d56fe1ae3bc5c04705d930cab5779da28c-8194355-images-thumbs&n=13",
    },
    {
      id: 2,
      name: "John Doe",
      img: "https://avatars.mds.yandex.net/i?id=1fdcb8d56fe1ae3bc5c04705d930cab5779da28c-8194355-images-thumbs&n=13",
    },
    {
      id: 3,
      name: "John Doe",
      img: "https://avatars.mds.yandex.net/i?id=1fdcb8d56fe1ae3bc5c04705d930cab5779da28c-8194355-images-thumbs&n=13",
    },
    {
      id: 4,
      name: "John Doe",
      img: "https://avatars.mds.yandex.net/i?id=1fdcb8d56fe1ae3bc5c04705d930cab5779da28c-8194355-images-thumbs&n=13",
    },
  ];
  return (
    <div className='stories'>
      <div className="story">
          <img src={currentUser.profilePic} alt="" />
          <span>{currentUser.name}</span>
          <button>+</button>
        </div>
      {stories.map((story) => (
        <div className="story">
          <img src={story.img}/>
          <span>{story.name}</span>
        </div>
      ))}
    </div>
  )
}
