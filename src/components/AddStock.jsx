import React, { useState,useContext } from 'react';
import AuthContext from "../context/AuthContext";
import Button from "../layout/Button"
import { jwtDecode } from 'jwt-decode';

export default function AddStock( {onStockAdded, setIsUpdated} ) {


    let { authTokens} = useContext(AuthContext);
    const decoded_jwt =  jwtDecode(authTokens.access)
    const userId = String(decoded_jwt.user_id)
    


    
  const [stockData, setStockData] = useState({
    ticker_symbol: '',
    company_name: '',
    market_price: '',
    open_price: '',
    close_price: '',
    week_52_high: '',
    week_52_low: '',
    user_id: parseInt(userId)
  });

  const handleChange = (e) => {
    setStockData({ ...stockData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/stocksadd/`, { 
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

      if (onStockAdded) {
        onStockAdded();
        setIsUpdated(true)
    }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="md:w-2/4 w-full mx-auto p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-semibold text-brightGreen mb-6">Add New Stock</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Ticker Symbol */}
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
            {/* Company Name */}
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
            {/* Market Price */}
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
            {/* Open Price */}
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
            {/* Close Price */}
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
            {/* 52 Week High */}
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
            {/* 52 Week Low */}
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
            {/* Submit Button */}
            <div className="flex justify-center">
                <Button 
                    className="bg-brightGreen hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Add Stock
                </Button>
            </div>
        </form>
    </div>
);
}