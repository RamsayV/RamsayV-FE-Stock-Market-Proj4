import React, { useState, useContext, useEffect } from 'react';
import AuthContext from "../context/AuthContext";
import Button from "../layout/Button";

export default function EditStock({ selectedStock, onStockUpdated, setIsUpdated }) {
  let { authTokens } = useContext(AuthContext);

  const [stockData, setStockData] = useState({
    ticker_symbol: '',
    company_name: '',
    market_price: '',
    open_price: '',
    close_price: '',
    week_52_high: '',
    week_52_low: '',
    // Assuming the stock model contains a user_id field
    user_id_id: selectedStock.user_id_id 
  });

  useEffect(() => {
    if (selectedStock) {
      setStockData({
        ticker_symbol: selectedStock.ticker_symbol,
        company_name: selectedStock.company_name,
        market_price: selectedStock.market_price,
        open_price: selectedStock.open_price,
        close_price: selectedStock.close_price,
        week_52_high: selectedStock.week_52_high,
        week_52_low: selectedStock.week_52_low,
        user_id: selectedStock.user_id
      });
    }
  }, [selectedStock]);

  const handleChange = (e) => {
    setStockData({ ...stockData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/stocksupdate/${selectedStock.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + String(authTokens.access),
        },
        body: JSON.stringify(stockData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log("Stock updated successfully");

      if (onStockUpdated) {
        onStockUpdated();
        setIsUpdated(true);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="md:w-2/4 w-full mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-semibold text-brightGreen mb-6">Edit Stock</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Input for Ticker Symbol */}
        <div className="space-y-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ticker_symbol">
            Ticker Symbol
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="ticker_symbol"
            type="text"
            name="ticker_symbol"
            value={stockData.ticker_symbol}
            onChange={handleChange}
            placeholder="Ticker Symbol"
          />
        </div>
        {/* Input for Company Name */}
        <div className="space-y-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="company_name">
            Company Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="company_name"
            type="text"
            name="company_name"
            value={stockData.company_name}
            onChange={handleChange}
            placeholder="Company Name"
          />
        </div>
        {/* Input for Market Price */}
        <div className="space-y-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="market_price">
            Market Price
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="market_price"
            type="text"
            name="market_price"
            value={stockData.market_price}
            onChange={handleChange}
            placeholder="Market Price"
          />
          </div>
        <div className="space-y-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="open_price">
            Open Price
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="open_price"
            type="text"
            name="open_price"
            value={stockData.open_price}
            onChange={handleChange}
            placeholder="Open Price"
          />
        </div>

        {/* Input for Close Price */}
        <div className="space-y-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="close_price">
            Close Price
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="close_price"
            type="text"
            name="close_price"
            value={stockData.close_price}
            onChange={handleChange}
            placeholder="Close Price"
          />
        </div>

        {/* Input for 52 Week High */}
        <div className="space-y-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="week_52_high">
            52 Week High
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="week_52_high"
            type="text"
            name="week_52_high"
            value={stockData.week_52_high}
            onChange={handleChange}
            placeholder="52 Week High"
          />
        </div>

        {/* Input for 52 Week Low */}
        <div className="space-y-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="week_52_low">
            52 Week Low
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="week_52_low"
            type="text"
            name="week_52_low"
            value={stockData.week_52_low}
            onChange={handleChange}
            placeholder="52 Week Low"
          />
        </div>

        {/* Update Stock Button */}
        <div className="flex justify-center">
          <Button 
            className="bg-brightGreen hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Update Stock
          </Button>
        </div>
      </form>
    </div>
  );
}