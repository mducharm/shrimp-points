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
import Landing from "./pages/Landing";
import About from "./pages/About";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useStore } from "./store/store";
import Profile from "./pages/Profile";
import { ActionKind } from "./store/actions";
import { Settings } from "./pages/Settings";
import { Dashboard } from "./pages/Dashboard";
import { ManageTasksForm } from "./pages/ManageTasksForm";
import { CompleteTaskForm } from "./pages/CompleteTasksForm";
import { ManageGroup } from "./pages/ManageGroup";

function LoggedInLinks() {
  return (
    <>
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
      <li>
        <Link to="/profile">Profile</Link>
      </li>
      <li>
        <Link to="/manage-tasks">Manage Tasks</Link>
      </li>
      <li>
        <Link to="/complete-task">Complete Task</Link>
      </li>
      <li>
        <Link to="/settings">Settings</Link>
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
        {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            {state.isLoggedIn ? <LoggedInLinks /> : <AnonymousLinks />}
          </ul>
        </nav> */}
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
          <Route path="/manage-tasks">
            {state.isLoggedIn ? <ManageTasksForm /> : <Redirect to="/login" />}
          </Route>
          <Route path="/group">
            {state.isLoggedIn ? <ManageGroup /> : <Redirect to="/group" />}
          </Route>
          <Route path="/complete-task">
            {state.isLoggedIn ? <CompleteTaskForm /> : <Redirect to="/login" />}
          </Route>
          <Route path="/settings">
            {state.isLoggedIn ? <Settings /> : <Redirect to="/login" />}
          </Route>
          <Route path="/profile">
            {state.isLoggedIn ? <Profile /> : <Redirect to="/login" />}
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">
            {state.isLoggedIn ? <Dashboard /> : <Landing />}
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
