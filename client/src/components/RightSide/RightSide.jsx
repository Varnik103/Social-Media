import React from 'react'
import home from '../../img/home.png'
import {AiOutlineSetting} from 'react-icons/ai'
import noti from '../../img/noti.png'
import comment from '../../img/comment.png'
import './RightSide.css'
import TrendCard from '../TrendCard/TrendCard'

const RightSide = () => {
  return (
    <div className="RightSide">
        <div className="navIcons">
            <img src={home} alt="" />
            <AiOutlineSetting  className='setting'/>
            <img src={noti} alt="" />
            <img src={comment} alt="" />
        </div>
        <TrendCard/>
        <button className='button r-button'> 
            Share
        </button>
    </div>
  )
}

export default RightSide
