import React, { useState, useContext } from 'react';
import AuthContext from "../context/AuthContext";
import { jwtDecode } from 'jwt-decode';

export default function AddStockPortfolio({ stocks, portfolios, setIsUpdated }) {

  console.log(portfolios)
  let { authTokens } = useContext(AuthContext);
  const decoded_jwt =  jwtDecode(authTokens.access)
  console.log("decodes_jwt:", decoded_jwt);
  const userId = String(decoded_jwt.user_id)
  console.log(userId);

  const [portfolioData, setPortfolioData] = useState({
    stock: '',
    quantity: '',
    portfolio: '',
    user_id: parseInt(userId),
  });

  const handleChange = (e) => {
    console.log(e.target.name);
    setPortfolioData({ ...portfolioData, [e.target.name]: e.target.value });
    console.log(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedData = {
      ...portfolioData,
      stock: parseInt(portfolioData.stock, 10),
      quantity: parseInt(portfolioData.quantity, 10),
      portfolio: parseInt(portfolioData.portfolio, 10),
    };
  

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/addstockportfolios/`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + String(authTokens.access), 
        },
        body: JSON.stringify(formattedData),
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