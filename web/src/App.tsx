import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useStore } from "./store/store";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import { ActionKind } from "./store/actions";

function LoggedInLinks() {
  return (
    <>
      <li>
        <Link to="/profile">Profile</Link>
      </li>
      <li>
        <Link to="/logout">Logout</Link>
      </li>
    </>
  );
}

function AnonymousLinks() {
  return (
    <>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
    </>
  );
}

function Logout() {
  const { dispatch } = useStore();
  dispatch({ type: ActionKind.LOGOUT });
  return <Redirect to="/login"></Redirect>;
}

function App() {
  const { state } = useStore();
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            {state.isLoggedIn ? <LoggedInLinks /> : <AnonymousLinks />}
          </ul>
        </nav>
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/logout">
            <Logout />
          </Route>
          <Route path="/profile">
            {state.isLoggedIn ? <Profile /> : <Redirect to="login" />}
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
