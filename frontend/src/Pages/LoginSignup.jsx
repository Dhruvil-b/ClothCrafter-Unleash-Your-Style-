import React, { useState } from 'react';
import './CSS/LoginSignup.css';

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const [fillError, setFillError] = useState({
    userError: "",
    passwordError: "",
    emailError: ""
  });

  const changeHandaler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const login = async () => {
    setFillError({ userError: "", passwordError: "", emailError: "" });
    const emailRegexp = /^[a-zA-Z0-9._-]+@[a-zA-z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegexp.test(formData.email)) {
      setFillError(prevState => ({ ...prevState, emailError: "Enter valid email" }));
    }

    if (!formData.email) {
      setFillError(prevState => ({ ...prevState, emailError: "Email is required" }));
    }
    if (!formData.password) {
      setFillError(prevState => ({ ...prevState, passwordError: "Password is required" }));
    }
    if ((!formData.email) || (!emailRegexp.test(formData.email)) || (!formData.password)) {
      return;
    }
    console.log("Login function Executed", formData);
    let responseData;
    await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).then((response) => response.json()).then((data) => responseData = data)

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace("/");
    } else {
      alert(responseData.errors)
    }
  }

  const signup = async () => {
    setFillError({ userError: "", passwordError: "", emailError: "" });

    if (!formData.username) {
      setFillError(prevState => ({ ...prevState, userError: "User Name is required" }));
    }
    if (!formData.email) {
      setFillError(prevState => ({ ...prevState, emailError: "Email is required" }));
    }
    const emailRegexp = /^[a-zA-Z0-9._-]+@[a-zA-z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegexp.test(formData.email)) {
      setFillError(prevState => ({ ...prevState, emailError: "Enter valid email" }));
    }
    if (!formData.password) {
      setFillError(prevState => ({ ...prevState, passwordError: "Password is required" }));
    }
    if ((!formData.username) || (!formData.email) || (!emailRegexp.test(formData.email)) || (!formData.password)) {
      return;
    }

    console.log("signup function executed", formData);
    let responseData;
    await fetch('http://localhost:4000/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).then((response) => response.json()).then((data) => responseData = data)

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace("/");
    } else {
      alert(responseData.errors)
    }
  }

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up" && <input name='username' value={formData.username} onChange={changeHandaler} type="text" placeholder='Your Name' />}
          <span>{fillError.userError}</span>
          <input name='email' value={formData.email} onChange={changeHandaler} type="email" placeholder='Email Address' />
          <span>{fillError.emailError}</span>
          <input name='password' value={formData.password} onChange={changeHandaler} type="password" placeholder='Password' />
          <span>{fillError.passwordError}</span>
        </div>
        <button onClick={() => { state === "Login" ? login() : signup() }}>Continue</button>
        {state === "Sign Up" ?
          <p className='loginsignup-login'>Already have an account? <span onClick={() => { setState("Login"); setFillError({ userError: "", passwordError: "", emailError: "" }); }}>Login here</span></p> :
          <p className='loginsignup-login'>Create an account? <span onClick={() => { setState("Sign Up"); setFillError({ userError: "", passwordError: "", emailError: "" }); }}>Click here</span></p>
        }
        <div className="loginsignup-agree">
          <input type="checkbox" name='' id='' />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup;
