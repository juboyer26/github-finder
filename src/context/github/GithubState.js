import React, {useReducer} from 'react';
import axios from 'axios';
import GithubReducer from './githubReducer';
import GithubContext from './githubcontext';
import {
    SEARCH_USERS,
    SET_ALERT,
    CLEAR_USERS,
    GET_USER,
    GET_REPOS,
    SET_LOADING
} from '../types';

const GithubState = props => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    }

    const [state, dispatch] = useReducer(GithubReducer, initialState);

    // Search Users
    const searchUsers = async (text) => {
        setloading();

        const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=$
            {process.env.REACT_APP_GITHUB_CLIENT_ID}
            &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
            );

    // setUsers(res.data.items);
        dispatch({
            type: SEARCH_USERS,
            payload: res.data.items
        });
    
  }



    // Get User
    const getUser = async (username) => {
        setloading();

        const res = await axios.get(`https://api.github.com/users/${username}?client_id=$
            {process.env.REACT_APP_GITHUB_CLIENT_ID}
            &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

        // setUser(res.data);
        // setloading(false);
        dispatch({
            type: GET_USER,
            payload: res.data
        })
    }

    // Get Repos
    const getRepos = async (username) => {
        setloading();

        const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=$
            {process.env.REACT_APP_GITHUB_CLIENT_ID}
            &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

        dispatch({
            type: GET_REPOS,
            payload: res.data
        })
    }


    // Clear users
    const clearUsers = () => dispatch({type: CLEAR_USERS});

    const setloading = () => dispatch({type: SET_LOADING});

    return <GithubContext.Provider 
        value={{
            users: state.users,
            user: state.user,
            repos: state.repos,
            loading: state.loading,
            searchUsers,
            clearUsers,
            getUser,
            getRepos
        }}>
            {props.children}
        </GithubContext.Provider>
}

export default GithubState;