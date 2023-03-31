import React from 'react'
import logo from '../../img/logo.png'
import './Auth.css'

const Auth = () => {
  return (
    <div className="Auth">
        <div className="a-left">
            <img src={logo} alt="" />
            <div className="Webname">
                <h1>Web Name</h1>
                <h6>Tagline</h6>
            </div>
        </div>
        <h1>Form</h1>
    </div>
  )
}

export default Auth
