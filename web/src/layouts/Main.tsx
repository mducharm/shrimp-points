import React, { FC, useState } from "react";
import "../App.css";
import { Menu } from "./Menu";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core";

const Main: FC = ({ children }) => {
  return (
    <div className="App">
      <Menu></Menu>
      {children}
    </div>
  );
};

export default Main;
