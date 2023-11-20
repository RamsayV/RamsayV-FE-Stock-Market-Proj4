import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Nav = () => {
    let { user, logoutUser } = useContext(AuthContext);
    const [menu, setMenu] = useState(false)

    const handleChange = () => {
        setMenu(!menu);
      };

    return (
        <div>
      <div className="flex flex-row justify-between p-5 px-5 md:px-32 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        <div>
          <Link to="/" className=" font-semibold text-2xl p-1 cursor-pointer">
            TakeStock
          </Link>
        </div>
            {/* <span> | </span>
            {user ? (
                <p onClick={logoutUser}>Logout</p> // Assuming you will replace this with a logout mechanism
            ) : (
                <Link to="/login">Login</Link>
            )}
            {user && <p> Hello {user.username}</p>}
            <span> | </span> */}
            <Link to="/stocks">Stocks</Link>
        </div>
        </div>
    );
};

export default Nav;