import React, { useState, useContext } from 'react';
import AuthContext from "../context/AuthContext";
import { jwtDecode } from 'jwt-decode';

export default function AddPortfolio({ onAdd }) {
  let { authTokens } = useContext(AuthContext);
  const decoded_jwt =  jwtDecode(authTokens.access)
  console.log("decodes_jwt:", decoded_jwt);
  const userId = String(decoded_jwt.user_id)
  console.log(userId);


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
    <form onSubmit={handleSubmit}>
      <h2>Add New Portfolio</h2>
      <input
        type="text"
        name="portfolio_name"
        onChange={handleChange}
        placeholder="Enter Portfolio Name"
        required
      />
      <input
        type="number"
        name="total_value"
        onChange={handleChange}
        placeholder="Enter TotalValue"
        required
      />
      <button type="submit">Add Portfolio</button>
    </form>
  );
}