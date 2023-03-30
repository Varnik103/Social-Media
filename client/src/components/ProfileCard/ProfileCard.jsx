import React from 'react'
import img1 from '../../img/img1.jpg'
import image from '../../img/image.png'
import './ProfileCard.css'
const ProfileCard = () => {
  return (
    <div className="ProfileCard">
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
            </div>
            <hr />
        </div>

        <span>
            My Profile
        </span>
    </div>
  )
}

export default ProfileCard
