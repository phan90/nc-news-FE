import React from 'react';
import PT from 'prop-types';
import { Link } from "react-router-dom";
import { SearchBar } from './index'
import '../css/nav.css'

function Nav({ loggedIn, currentUser, search, handleChange }) {
    return (
        <div className="header">
            <div className="top">
                <strong>NORTHCODERS NEWS</strong>
            </div>
            <ul>
                <li><Link to="/"><i className="fa fa-home"></i></Link></li>
                <li><Link to="/topics/cooking">Cooking</Link></li>
                <li><Link to="/topics/coding">Coding</Link></li>
                <li><Link to="/topics/football">Football</Link></li>
                {loggedIn === false ?
                    <li id="login">
                        <Link to="/users">
                            Sign in <i className="fa fa-user"></i>
                        </Link></li> :
                    <li id="login"> <Link to={`/users/${currentUser.username}`}>
                        <img alt="avatar" id="avatar" src={currentUser.avatar_url} /> {currentUser.name}
                    </Link></li>}
                <li id="login">
                    <SearchBar handleChange={handleChange} search={search} /></li>
            </ul>
        </div>
    );
}

Nav.propTypes = {
    loggedIn: PT.bool.isRequired,
    currentUser: PT.object.isRequired,
    search: PT.string.isRequired,
    handleChange: PT.func.isRequired
}


export default Nav;