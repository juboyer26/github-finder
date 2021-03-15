import React, { Fragment, useState } from "react";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import axios from "axios";

import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import User from "./components/users/User";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from './components/pages/About';

import GithubState from './context/github/GithubState';

import "./App.css";

const App = () =>  {

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({})
  const [repos, setrepos] = useState([]);
  const [loading, setloading] = useState(false);
  const [alert, setalert] = useState(null);

  const searchUsers = async (text) => {
    setloading({loading: true})
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=$
      {process.env.REACT_APP_GITHUB_CLIENT_ID}
      &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    setUsers(res.data.items);
    setloading(false);
  }

  // get single github user
  const getUser = async (username) => {
    setloading(true);

    const res = await axios.get(`https://api.github.com/users/${username}?client_id=$
      {process.env.REACT_APP_GITHUB_CLIENT_ID}
      &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    setUser(res.data);
    setloading(false);
  }

  // get users repos
  const getRepos = async (username) => {
    setloading(true);

    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=$
      {process.env.REACT_APP_GITHUB_CLIENT_ID}
      &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    setrepos(res.data);
    setloading(false);
  }

  // clear users from state
  const clearUsers = () => {
    setUsers([]);
    setloading(false);
  }

  // set alert
  const setAlert = (msg, type) => {
    setalert({msg, type})
    setTimeout(() => setalert(null), 5000);
  }

    return (
      <GithubState>
      <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Alert alert={alert}/>
          <Switch>
            <Route exact path="/" render={props => (
              <Fragment>
                <Search searchUsers={searchUsers} clearUsers={clearUsers} showClear={users.length > 0 ? true : false} setAlert={setAlert} />
                <Users loading={loading} users={users} getRepos={getRepos} repos={repos}/>
              </Fragment>
            )}/>
            <Route exact path="/about" component={About}/>
            <Route exact path="/user/:login" render={props => (<User {...props} getUser={getUser} getRepos={getRepos} user={user} repos={repos} loading={loading}/>)} />
          </Switch>
          
        </div>
      </div>
      </Router>
      </GithubState>
    );
}

export default App;
