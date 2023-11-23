import React, { useState, useContext } from 'react';
import AuthContext from "../context/AuthContext";
import { jwtDecode } from 'jwt-decode';

export default function AddPortfolio({ onAdd }) {
  let { authTokens } = useContext(AuthContext);
  const decoded_jwt =  jwtDecode(authTokens.access)
  const userId = String(decoded_jwt.user_id)


  const initialState= {
    portfolio_name: '', 
    total_value: '',
    user_id: parseInt(userId)
  }
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/portfoliosadd/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authTokens.access}`,
        },
        body: JSON.stringify( {...formData} )
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
        ;
      }

      const newPortfolio = await response.json();
      onAdd(newPortfolio); 
      setFormData(initialState); 
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mt-5 max-w-md mx-auto">
      <h2 className="text-3xl font-semibold mb-4">Add New Portfolio</h2>
      <div className="mb-4">
        <input
          type="text"
          name="portfolio_name"
          onChange={handleChange}
          placeholder="Enter Portfolio Name"
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <input
          type="number"
          name="total_value"
          onChange={handleChange}
          placeholder="Enter Total Value"
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <button type="submit" className="text-white bg-brightGreen hover:bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
        Add Portfolio
      </button>
    </form>
  );
}