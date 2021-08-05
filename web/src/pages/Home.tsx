import React, { useState } from "react";
import logo from "../logo.svg";
import "../App.css";
import Main from "../layouts/Main";

function Home() {
  return (
    <Main>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Home</p>
        </header>
      </div>
    </Main>
  );
}

export default Home;
