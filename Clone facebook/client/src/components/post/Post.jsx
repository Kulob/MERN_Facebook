import { useState } from "react";
import './post.scss'
import { FcLike } from "react-icons/fc";
import { MdFavoriteBorder,MdFavorite } from "react-icons/md";
import { BiMessageDots, BiShareAlt } from "react-icons/bi";
import { FiMoreHorizontal } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Comments } from "../comments/Comments";
import moment from 'moment'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false)

  const {currentUser} = useContext(AuthContext)
  const { isLoading, error, data } = useQuery(['likes', post.id],
  () => 
  makeRequest.get("/likes?postId="+post.id).then((res) => {
    return res.data
  })
  )  
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (liked) => {
      if (liked) return makeRequest.delete("/likes?postId=" + post.id);
      return makeRequest.post("/likes", { postId: post.id });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["likes"]);
      },
    }
  );
  const handleLike = () => {
      mutation.mutate(data.includes(currentUser.id))
  }

  const deleteMutation = useMutation(
    (postId) => {
      return makeRequest.delete("/posts/" + postId);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );
  const handleDelete = () => {
    deleteMutation.mutate(post.id);
  };

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
          <img src={"/upload/"+post.profilePic} alt="" />
            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.name}</span>
              </Link>
              <span className="date">{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
          <FiMoreHorizontal onClick={() => setMenuOpen(!menuOpen)}/>
          {menuOpen && post.userId === currentUser.id && (
            <button onClick={handleDelete}>delete</button>
          )}
        </div>
        <div className="content">
          <p>{post.desc}</p>
          <img src={"./upload/"+post.img} alt="" />
        </div>
        <div className="info">
          <div className="item">
            {isLoading ? "Loading" : data.includes(currentUser.id) ? 
            <FcLike onClick={handleLike}/> 
            : 
            <MdFavoriteBorder onClick={handleLike}/>}
            {data?.length} Likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <BiMessageDots />
            12 Comments
          </div>
          <div className="item">
            <BiShareAlt />
            Share
          </div>
        </div>
        {commentOpen && <Comments postId={post.id}/>}
      </div>
    </div>
  );
};

export default Post;