import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Nav = () => {
    let { user, logoutUser } = useContext(AuthContext);
console.log(user);
    return (
        <div>
            <Link to="/">Home</Link>
            <span> | </span>
            {user ? (
                <p onClick={logoutUser}>Logout</p> // Assuming you will replace this with a logout mechanism
            ) : (
                <Link to="/login">Login</Link>
            )}
            {user && <p> Hello {user.username}</p>}
            <span> | </span>
            <Link to="/stocks">Stocks</Link>
            <span> | </span>
            <Link to="/portfolios">Portfolios</Link>
        </div>
    );
};

export default Nav;