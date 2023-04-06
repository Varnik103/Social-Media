import React from 'react'
import FollowersCard from '../FollowersCard/FollowersCard'
import LogoSearch from '../LogoSearch/LogoSearch'
import Description from '../Description/Description'
import './LeftSide.css'
const LeftSide = () => {
  return (
      <div className="LeftSide">
        <LogoSearch/>
        <Description/>
        <FollowersCard/>
      </div>
  )
}

export default LeftSide