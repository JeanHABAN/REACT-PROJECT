import React,  { Component } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

export default function Nav() {
  const navigate = useNavigate();
  const logoutFn = () => {
    localStorage.clear();
    navigate('/login');
  }
  
  return (
    <> 
     
  <header id="header" className="fixed-top">
    <div className="container d-flex align-items-center">

      <h1 className="logo me-auto"><a href="index.html">University of Technology</a></h1>
      
     
      <nav id="navbar" className="navbar order-last order-lg-0">
        <ul>
       
          <li> <Link to="/home">Home</Link> </li>
          {/* <li> <Link to="/about">About</Link> </li> */}
          <li> <Link to="/courses">Courses</Link> </li>
          <li> <Link to="/trainers">Trainers</Link> </li>
          {/* <li> <Link to="/events">Events</Link> </li> */}
          {/* <li> <Link to="/contact">Contact us</Link> </li> */}
          <li> <Link to="/details">Admin</Link> </li>
        </ul>
        <i className="bi bi-list mobile-nav-toggle"></i>
      </nav>
      <li type="button" onClick={logoutFn} > <i className="bi bi-box-arrow-right" style={{backgroundColor:"#5fcf80", marginLeft:"55px", fontSize:"30px"}}></i></li>
      
    </div>
  </header>
    </>
  )
}
