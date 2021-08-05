import React, { useState } from "react";
import logo from "../logo.svg";
import "../App.css";
import Main from "../layouts/Main";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Landing</p>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </header>
    </div>
  );
}

export default Landing;
