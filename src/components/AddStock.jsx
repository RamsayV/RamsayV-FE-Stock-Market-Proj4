import React, { useState,useContext } from 'react';
import AuthContext from "../context/AuthContext";
import Button from "../layout/Button"

export default function AddStock() {
    let { authTokens} = useContext(AuthContext);
  const [stockData, setStockData] = useState({
    ticker_symbol: '',
    company_name: '',
    market_price: '',
    open_price: '',
    close_price: '',
    week_52_high: '',
    week_52_low: '',
  });

  const handleChange = (e) => {
    setStockData({ ...stockData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/stocksadd/', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + String(authTokens.access), 
        },
        body: JSON.stringify(stockData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log("Stock added successfully");
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="md:w-2/4 w-full mx-auto">
        <h1 className="text-3xl font-semibold text-brightGreen mb-4">Add New Stock</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
      <input 
        name="ticker_symbol"
        value={stockData.ticker_symbol}
        onChange={handleChange}
        placeholder="Ticker Symbol"
      />
      <input 
        name="company_name"
        value={stockData.company_name}
        onChange={handleChange}
        placeholder="Company Name"
      />
      <input 
        name="market_price"
        value={stockData.market_price}
        onChange={handleChange}
        placeholder="Market Price"
      />
      <input 
        name="open_price"
        value={stockData.open_price}
        onChange={handleChange}
        placeholder="Open Price"
      />
      <input 
        name="close_price"
        value={stockData.close_price}
        onChange={handleChange}
        placeholder="Close Price"
      />
      <input 
        name="week_52_high"
        value={stockData.week_52_high}
        onChange={handleChange}
        placeholder="52 Week High"
      />
      <input 
        name="week_52_low"
        value={stockData.week_52_low}
        onChange={handleChange}
        placeholder="52 Week Low"
      />
     <Button title="Add Stock" type="submit" />
    </form>
  </div>
);
}