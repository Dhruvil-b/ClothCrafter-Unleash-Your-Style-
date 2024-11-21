import React from 'react'
import './Navbar.css'
// import navlog from '../../assets/nav-logo.svg'
import navProfile from '../../assets/nav-profile.svg'
import logo from '../../assets/logo.png'
const Navbar = () => {
  return (
  
     <div className='navbar'>
      {/* <img src={navlog} alt="" className="nav-logo" /> */}
      <div className="nav-logo">
          <img src={logo} alt="" />
          <p>ClothCrafter</p>
       </div>
      
      <img src={navProfile} className='nav-profile' alt="" />
    </div>
  
   
  )
}

export default Navbar
