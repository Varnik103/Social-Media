import React from 'react'
import './Home.css'
import ProfileSide from '../../components/ProfileSide/ProfileSide'
const Home = () => {
  return (
    <div className="Home">
      <ProfileSide/>
      <div className="PostSide" >Post</div>
      <div className="RigthSide" >Right</div>
    </div>
  )
}

export default Home
