import React from 'react';
import './Header.css';
import Login from "./Login";
import Signup from "./Signup";

const Header = () => (
  <header className="header">
    <a href="/about" className="no-underline"><span className="nav-link">About</span></a>
    <a href="/" className="logo-container">
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/16d9e73da749028535b483d8ace7f27155660c5f575d746c967a83d4b5ac0d87?apiKey=d22a939618da4e96809232126d1f951c&"
        alt="BSDOC Logo"
        className="logo"
      />
    </a>
    <nav className="nav">
      <a href="/bookschedule" className="nav-sched-link">Schedule an appointment</a>
      <Login></Login>
      <Signup></Signup>
    </nav>
  </header>
);

export default Header;
