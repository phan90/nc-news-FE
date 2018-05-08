import React from 'react';
import PT from 'prop-types';

function Users({ loggedIn, logIn, handleUsername }) {
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
        </div>
    );
}

Users.propTypes = {
    loggedIn: PT.bool.isRequired,
    logIn: PT.func.isRequired,
    handleUsername: PT.func.isRequired
}

export default Users;