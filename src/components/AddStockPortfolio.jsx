import React, { useState, useContext } from 'react';
import AuthContext from "../context/AuthContext";

export default function AddStockPortfolio({ stocks, portfolios, setIsUpdated }) {

  console.log(portfolios)
  let { authTokens } = useContext(AuthContext);

  const [portfolioData, setPortfolioData] = useState({
    stock: '',
    quantity: '',
    portfolio: '',
  });

  const handleChange = (e) => {
    setPortfolioData({ ...portfolioData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/addstockportfolio/', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + String(authTokens.access), 
        },
        body: JSON.stringify(portfolioData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log("Stock portfolio updated successfully");
      setIsUpdated(true)
      console.log(setIsUpdated())
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
        <h1>Add to Stock Portfolio</h1>
        <form onSubmit={handleSubmit}>
          <select 
            name="stock"
            value={portfolioData.stock}
            onChange={handleChange}
          >
            {stocks.map(stock => (
              <option key={stock.id} value={stock.id}>
                {stock.company_name} ({stock.ticker_symbol})
              </option>
            ))}
          </select>
          <input 
            name="quantity"
            type="number"
            value={portfolioData.quantity}
            onChange={handleChange}
            placeholder="Quantity"
          />
          <select 
            name="portfolio"
            value={portfolioData.portfolio}
            onChange={handleChange}
          >
            {portfolios.map(portfolio => (
              <option key={portfolio.id} value={portfolio.id}>
                {portfolio.portfolio_name}
              </option>
            ))}
          </select>
          <button type="submit">Add to Portfolio</button>
        </form>
    </div>
  );
}