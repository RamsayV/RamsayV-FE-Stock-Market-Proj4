import React, { useState, useContext } from 'react';
import AuthContext from "../context/AuthContext";

export default function AddPortfolio({ onAdd }) {
  const [portfolioName, setPortfolioName] = useState('');
  let { authTokens } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/portfoliosadd/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authTokens.access}`,
        },
        body: JSON.stringify({ portfolio_name: portfolioName })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const newPortfolio = await response.json();
      onAdd(newPortfolio); 
      setPortfolioName(''); 
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Portfolio</h2>
      <input
        type="text"
        value={portfolioName}
        onChange={(e) => setPortfolioName(e.target.value)}
        placeholder="Enter Portfolio Name"
        required
      />
      <button type="submit">Add Portfolio</button>
    </form>
  );
}