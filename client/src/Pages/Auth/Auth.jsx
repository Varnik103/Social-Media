import React from "react";
import logo from "../../img/logo.png";
import "./Auth.css";

const Auth = () => {
  return (
    <div className="Auth">
      <div className="a-left">
        <img src={logo} alt="" />
        <div className="Webname">
          <h1>Name</h1>
          <h6>Tagline</h6>
        </div>
      </div>
      <SignUp />
      {/* <Login/> */}
    </div>
  );
};

function Login(){
    return (
        <div className="a-right">
          <form className="infoForm authForm">
            <h3>Login</h3>
    
            <div>
              <input
                type="text"
                className="infoInput"
                name="username"
                placeholder="Username"
              />
            </div>
    
            <div>
              <input
                type="text"
                className="infoInput"
                name="password"
                placeholder="Password"
              />
            </div>
    
            <div>
                <span style={{fontSize: '12px'}}>Don't have an account Sign Up</span>
            </div>
            <button className="button infoButton" type="submit">Login</button>
          </form>
        </div>
      );
}


function SignUp() {
  return (
    <div className="a-right">
      <form className="infoForm authForm">
        <h3>Sign Up</h3>
        <div>
          <input
            type="text"
            placeholder="First Name"
            className="infoInput"
            name="firstname"
          />
          <input
            type="text"
            placeholder="Last Name"
            className="infoInput"
            name="lastname"
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="username"
            placeholder="Username"
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="password"
            placeholder="Password"
          />
          <input
            type="text"
            className="infoInput"
            name="confirmpassword"
            placeholder="Confirm Password"
          />
        </div>

        <div>
            <span style={{fontSize: '12px'}}>Already have an account. Login!</span>
        </div>
        <button className="button infoButton" type="submit">SignUp</button>
      </form>
    </div>
  );
}

export default Auth;
