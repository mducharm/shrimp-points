import React, { FC, useState } from "react";
import logo from "../logo.svg";
import "../App.css";

const Main: FC = ({ children }) => (
  <div className="App">
    <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
        {children}</header>
  </div>
);

export default Main;
