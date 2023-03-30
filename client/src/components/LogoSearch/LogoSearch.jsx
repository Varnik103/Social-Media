import React from 'react'
import {BiSearch} from 'react-icons/bi';
import img5 from '../../img/img5.jpg'
import './LogoSearch.css'
const LogoSearch = () => {
  return (
    <div className="LogoSearch">
        <img src={img5} alt="logo" />
        <div className="Search">
            <input type="text" placeholder='#Explore' />
            <div className="s-icon">
                <BiSearch/>
            </div>
        </div>
    </div>
  )
}

export default LogoSearch
