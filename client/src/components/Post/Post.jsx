// import React from 'react'
// import {AiOutlineHeart} from 'react-icons/ai'
// import {AiFillHeart} from 'react-icons/ai'
// import {AiOutlineComment} from 'react-icons/ai'
// import {AiOutlineShareAlt} from 'react-icons/ai'
// import { useSelector } from "react-redux";
// import like from '../../img/like.png'
// import notlike from '../../img/notlike.png'
// import share from '../../img/share.png'
// import comment from '../../img/comment.png'
// import './Post.css'

// const Post = ({data}) => {
//   const user = useSelector((state) => state.authReducer.authData);
//   return (
//     <div className="Post">
//         <img src={data.post.image? process.env.REACT_APP_PUBLIC_FOLDER + '/' + data.post.image: ""} alt="" />

//         <div className="PostReact">
//             <img src={data.liked?like:notlike} alt="" />
//             <img src={comment} alt="" />
//             <img src={share} alt="" />
//             {/* {data.liked?<AiFillHeart/>:<AiOutlineHeart/>}
//             <AiOutlineComment/>
//             <AiOutlineShareAlt/> */}
//         </div>

//         <span>{data.likes} likes</span>
//         <div className="detail">
//             <span><b>{data.name}</b></span>
//             <span> {data.desc}</span>
//         </div>
//     </div>
//   )
// }

// export default Post


import React, { useState } from "react";
import {AiOutlineheart} from 'react-icons/ai'
import {AiFillheart} from 'react-icons/ai'
import {AiOutlinecomment} from 'react-icons/ai'
import {AiOutlineshareAlt} from 'react-icons/ai'
import "./Post.css";
import like from '../../img/like.png'
import comment from "../../img/comment.png";
import share from "../../img/share.png";
import heart from "../../img/like.png";
import notlike from "../../img/notlike.png";
import { likePost } from "../../api/PostRequest";
import { useSelector } from "react-redux";

const Post = ({ data }) => {
  // console.log(data)
  const user  = useSelector((state) => state.authReducer.authData);
  // console.log(user._id)
  const [liked, setliked] = useState(data.post.likes.includes(user._id));
  const [likes, setlikes] = useState(data.post.likes.length)

  
  const handleLike = () => {
    likePost(data.post._id, user._id);
    setliked((prev) => !prev);
    liked? setlikes((prev)=>prev-1): setlikes((prev)=>prev+1)
  };
  return (
    <div className="Post">
      <img
        src={data.post.image ? process.env.REACT_APP_PUBLIC_FOLDER + '/' + data.post.image : ""}
        alt=""
      />

      <div className="postReact">
        <img
          src={liked ? heart : notlike}
          alt=""
          style={{ cursor: "pointer" }}
          onClick={handleLike}
        />
        <img src={comment} alt="" />
        <img src={share} alt="" />
      </div>

      <span style={{ color: "var(--gray)", fontSize: "12px" }}>
        {likes} likes
      </span>
      <div className="detail">
        <span>
          <b>{data.name} </b>
        </span>
        <span>{data.desc}</span>
      </div>
    </div>
  );
};
export default Post;