import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import img from "../assets/VaX01A01.svg"

const LoginPage = () => {
  let { loginUser } = useContext(AuthContext);
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <form onSubmit={loginUser} className="mt-8 space-y-6">
          <input className="bg-white text-gray-700 border border-gray-300 rounded-lg py-2 px-4 block w-full focus:border-blue-500 focus:outline-none" type="text" name="username" placeholder="Enter Username"/>
          <input className="bg-white text-gray-700 border border-gray-300 rounded-lg py-2 px-4 block w-full focus:border-blue-500 focus:outline-none" type="password" name="password" placeholder="Enter Password"/>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded;">Login</button>
        </form>
      </div>

      <div className="w-full md:w-3/4 lg:w-1/2 hidden lg:block">
        <img src={img} alt="Decorative" />
      </div>
    </div>
  );
};

export default LoginPage;