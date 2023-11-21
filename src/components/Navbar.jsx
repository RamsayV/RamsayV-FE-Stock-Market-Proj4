import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";

const Navbar = () => {
  let { user, logoutUser } = useContext(AuthContext);
  const [menu, setMenu] = useState(false);

  const handleChange = () => {
    setMenu(!menu);
  };
  return (
    <div>
      <div className="flex flex-row justify-between p-5 md:px-32 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        <div>
          <Link to="/" className=" font-semibold text-2xl p-1 cursor-pointer">
            TakeStock
          </Link>
        </div>
        <nav className=" hidden md:flex gap-5 font-medium p-1 text-lg">
          <Link
            to="/dashboard"
            spy={true}
            smooth={true}
            duration={500}
            className="hover:text-[#539165] transition-all cursor-pointer"
          >
            DashBoard
          </Link>
          <Link
            to="Portfolios"
            spy={true}
            smooth={true}
            duration={500}
            className="hover:text-[#539165] transition-all cursor-pointer"
          >
            Portfolio
          </Link>
          <Link
            to="/stocks"
            spy={true}
            smooth={true}
            duration={500}
            className="hover:text-[#539165] transition-all cursor-pointer"
          >
            Stocks
          </Link>
          {user ? (
            <p onClick={logoutUser}>Logout</p>
          ) : (
            <>
            <Link to="/login">Login</Link> 
            <Link to="/signup">SignUp</Link>
            </>
          )}
          {user && <p> Hello {user.username}</p>} 
        </nav>
        <div className="flex md:hidden" onClick={handleChange}>
          <div className="p-2">
            <AiOutlineMenu size={22} />
          </div>
        </div>
      </div>
      <div className={` ${
          menu ? "translate-x-0" : "-translate-x-full"
        } md:hidden flex flex-col absolute bg-[#ffffff] left-0 top-20 font-medium text-2xl text-center pt-8 pb-4 gap-8 w-full h-fit transition-transform duration-300`}>
 <Link
            to="/dashboard"
            spy={true}
            smooth={true}
            duration={500}
            className="hover:text-[#539165] transition-all cursor-pointer"
          >
            DashBoard
          </Link>
          <Link
            to="Portfolios"
            spy={true}
            smooth={true}
            duration={500}
            className="hover:text-[#539165] transition-all cursor-pointer"
          >
            Portfolio
          </Link>
          <Link
            to="Transactions"
            spy={true}
            smooth={true}
            duration={500}
            className="hover:text-[#539165] transition-all cursor-pointer"
          >
            Transactions
          </Link>
          <Link
            to="/stocks"
            spy={true}
            smooth={true}
            duration={500}
            className="hover:text-[#539165] transition-all cursor-pointer"
          >
            Stocks
            </Link>
          {user ? (
            <p spy={true}
            smooth={true}
            duration={500}
            className="hover:text-[#539165] transition-all cursor-pointer" onClick={logoutUser}>Logout</p>
          ) : (
            <Link to="/login">Login</Link>
          )}
          {user && <p> Hello {user.username}</p>}
      </div>
    </div>
  );
};

export default Navbar;
