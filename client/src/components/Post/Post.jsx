import React from 'react'
import {AiOutlineHeart} from 'react-icons/ai'
import {AiFillHeart} from 'react-icons/ai'
import {AiOutlineComment} from 'react-icons/ai'
import {AiOutlineShareAlt} from 'react-icons/ai'
import like from '../../img/like.png'
import notlike from '../../img/notlike.png'
import share from '../../img/share.png'
import comment from '../../img/comment.png'

import './Post.css'

const Post = ({data}) => {
  return (
    <div className="Post">
        <img src={data.img} alt="" />

        <div className="PostReact">
            <img src={data.liked?like:notlike} alt="" />
            <img src={comment} alt="" />
            <img src={share} alt="" />
            {/* {data.liked?<AiFillHeart/>:<AiOutlineHeart/>}
            <AiOutlineComment/>
            <AiOutlineShareAlt/> */}
        </div>

        <span>{data.likes} likes</span>
        <div className="detail">
            <span><b>{data.name}</b></span>
            <span> {data.desc}</span>
        </div>
    </div>
  )
}

export default Post
