import React, { Fragment, useEffect } from 'react';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Repos from '../repos/Repos';

const User = ({user, loading, repos, getRepos, getUser, match}) => {


    useEffect(() => {
        getUser(match.params.login);
        getRepos(match.params.login);
    }, []);

        // e.g https://api.github.com/users/mojombo
        const {name, avatar_url, location, bio, blog, login, html_url, company,followers, following, public_repos, public_gists, hireable} = user;

        if(loading) return <Spinner/>
        return (
            <Fragment>
               <Link to="/" className="btn btn-light">Back to search </Link>
               Hireable:{' '}
               {hireable ? (
                <i className=
                "fa fa-check text-success" />): (
                    <i className="fa fa-times-circle text-danger" />
                )}
                <div className="card grid-2">
                     <div className="all-center">
                         <img src={avatar_url} className="round-img" alt="" style={{width: '150px'}} />
                         <h1>{name}</h1>
                         <p>Location: {location}</p>
                     </div>
                     <div>
                         {bio && 
                            (<Fragment>
                                <h3>Bio</h3>
                                <p>{bio}</p>
                            </Fragment>
                            )}
                            <a href={html_url} className="btn my-1" style={{backgroundColor: "lightpink"}}>Visit Github Profile</a>
                            <ul>
                                <li>
                                    {login && <Fragment>
                                        <strong>Username: </strong> {login}
                                    </Fragment>}
                                </li>
                                <li>
                                    {company && <Fragment>
                                        <strong>Company: </strong> {company}
                                    </Fragment>}
                                </li>
                                <li>
                                    {blog && <Fragment>
                                        <strong>Website: </strong> {blog}
                                    </Fragment>}
                                </li>
                            </ul>
                     </div>
                </div>
                <div className="card text-center">
                    <div className="badge" style={{backgroundColor: "lightseagreen"}}>Followers: {followers}</div>
                    <div className="badge" style={{backgroundColor: "lightcoral"}}>Following: {following}</div>
                    <div className="badge" style={{backgroundColor: "lightgrey"}}>Public Repos: {public_repos}</div>
                    <div className="badge" style={{backgroundColor: "lightslategrey"}}>Public Gist: {public_gists}</div>
                </div>

                <Repos repos={repos} />
            </Fragment>
        )
}

User.propTypes = {
        loading: PropTypes.bool,
        user: PropTypes.object.isRequired,
        repos: PropTypes.array.isRequired,
        getUser: PropTypes.func.isRequired,
        getRepos: PropTypes.func.isRequired,
    }

export default User
