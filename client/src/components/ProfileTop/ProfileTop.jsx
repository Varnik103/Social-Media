import React from 'react'
import img1 from '../../img/img1.jpg'
import image from '../../img/image.png'
import './ProfileTop.css'
const ProfileTop = () => {
  return (
    <div className="ProfileTop">
        <div className="ProfileImages">
            <img src={image} alt="Cover" />
            <img src={img1} alt="profile pic" />
        </div>

        <div className="ProfileName">
            <span>ABC Gupta</span>
            <span>Student</span>
        </div>

        <div className="followstatus">
            <hr />
            <div>
                <div className="follow">
                    <span>7658</span>
                    <span>Followings</span>
                </div>
                <div className="vl"></div>
                <div className="follow">
                    <span>1</span>
                    <span>Followers</span>
                </div>
                <div className="vl"></div>
                <div className='follow'>
                    <span>4</span>
                    <span>Posts</span>
                </div>
            </div>
            <hr />
        </div>
    </div>
  )
}

export default ProfileTop