import React from 'react'
import './Profile.css'
import LeftSide from '../../components/LeftSide/LeftSide'
import MiddleSide from '../../components/MiddleSide/MiddleSide'
import RightSide from '../../components/RightSide/RightSide'

const Profile = () => {
  return (
    <div className="Profile">
      <LeftSide/>
      <MiddleSide/>
      <RightSide/>
    </div>
  )
}

export default Profile