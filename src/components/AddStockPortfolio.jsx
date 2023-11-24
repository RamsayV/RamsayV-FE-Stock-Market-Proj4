import React, { useState, useContext } from 'react';
import AuthContext from "../context/AuthContext";
import { jwtDecode } from 'jwt-decode';

export default function AddStockPortfolio({ stocks, portfolios, setIsUpdated, onStockPortfolioAdded }) {

  console.log(portfolios)
  console.log(stocks);
  let { authTokens } = useContext(AuthContext);
  const decoded_jwt =  jwtDecode(authTokens.access)
  const userId = String(decoded_jwt.user_id)

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
      onStockPortfolioAdded();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="md:w-2/4 w-full mx-auto p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-semibold text-brightGreen mb-6">Add to Stock Portfolio</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Stock Select */}
          <div className="space-y-2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stock">
              Stock
            </label>
            <select 
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="stock"
              value={portfolioData.stock}
              onChange={handleChange}
            >
              <option value = "0" >Select A stock</option>
              {stocks.map(stock => (
                <option key={stock.id} value={stock.id}>
                  {stock.company_name} ({stock.ticker_symbol})
                </option>
              ))}
            </select>
          </div>

          {/* Quantity Input */}
          <div className="space-y-2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
              Quantity
            </label>
            <input 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="quantity"
              type="number"
              value={portfolioData.quantity}
              onChange={handleChange}
              placeholder="Quantity"
            />
          </div>

          {/* Portfolio Select */}
          <div className="space-y-2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="portfolio">
              Portfolio
            </label>
            <select 
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="portfolio"
              value={portfolioData.portfolio}
              onChange={handleChange}
            >
              <option value = "0" >Select A Portfolio</option>
              {portfolios.map(portfolio => (
                <option key={portfolio.id} value={portfolio.id}>
                  {portfolio.portfolio_name}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button 
              className="bg-brightGreen hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Add to Portfolio
            </button>
          </div>
        </form>
    </div>
  );
}
