import React from 'react';
import PT from 'prop-types';
import { Redirect } from "react-router-dom";

function Users({ loggedIn, logIn, handleUsername, username }) {
    return (
        <div id="form-div" hidden={loggedIn}>
            <form onSubmit={logIn} className="form" id="form1">
                <p className="name">
                    <input onChange={handleUsername} name="username" type="text" className="feedback-input" placeholder="Username" id="name" />
                </p>
                <p className="email">
                    <input name="password" type="password" className="feedback-input" id="password" placeholder="Password" />
                </p>
                <div className="submit">
                    <input type="submit" value="LOG IN" id="button-blue" />
                    <div className="ease"></div>
                </div>
            </form>
            {loggedIn &&
            <Redirect to={`/users/${username}`} />
            }
        </div>
    );
}

Users.propTypes = {
    loggedIn: PT.bool.isRequired,
    logIn: PT.func.isRequired,
    handleUsername: PT.func.isRequired
}

export default Users;