import React, { useEffect, useState, useContext } from 'react';
import AuthContext from "../context/AuthContext";
import AddStock from '../components/AddStock';

export default function Stocks() {
  const [showAddStockForm, setShowAddStockForm] = useState(false);
  const [stocks, setStocks] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  let { authTokens, logoutUser } = useContext(AuthContext);

  useEffect(() => {
    const stockData = async () => {
      try {
        const response = await fetch('http://localhost:8000/stocks/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + String(authTokens.access),
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setStocks(data);
        console.log(data);
      } catch (error) {
        console.error('Error:', error);
        logoutUser(); 
      }
    };

    stockData();
  }, [authTokens, logoutUser]); 

  const handleStockClick = (stock) => {
    if (selectedStock && selectedStock.id === stock.id) {
      setSelectedStock(null);
    } else {
      setSelectedStock(stock);
    }
  };
  return (
    <div className="min-h-[70vh] flex flex-col items-center md:mx-32 mx-5 mt-10">
      <div className="text-center w-full">
        <h1 className="text-5xl font-semibold text-brightGreen mb-2">Stock Market Overview</h1>
        <button onClick={() => setShowAddStockForm(!showAddStockForm)}> Add Stock</button>

{showAddStockForm && <AddStock />}
        {selectedStock ? (
          // Detailed view
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="font-semibold text-xl mb-2">Detailed Information</h2>
            <p><strong>Company Name:</strong> {selectedStock.company_name}</p>
            <p><strong>Ticker Symbol:</strong> {selectedStock.ticker_symbol}</p>
            <p><strong>Market Price:</strong> {selectedStock.market_price}</p>
            <p><strong>Open Price:</strong> {selectedStock.open_price || 'N/A'}</p>
            <p><strong>Close Price:</strong> {selectedStock.close_price || 'N/A'}</p>
            <p><strong>52 Week High:</strong> {selectedStock.week_52_high || 'N/A'}</p>
            <p><strong>52 Week Low:</strong> {selectedStock.week_52_low || 'N/A'}</p>
            <button className="mt-4" onClick={() => setSelectedStock(null)}>Back to List</button>
          </div>
        ) : (
          // Stock list view
          <div>
            <p className="text-lg text-lightText mb-5">Explore real-time stock market data and insights.</p>
            <div className="grid md:grid-cols-2 gap-4">
              {stocks.map((stock, index) => (
                <div key={index} className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleStockClick(stock)}>
                  <h3 className="font-semibold mb-2">{stock.company_name} <span className="text-sm text-gray-500">({stock.ticker_symbol})</span></h3>
              <p><strong>Market Price:</strong> {stock.market_price}</p>
              <p><strong>Open Price:</strong> {stock.open_price || 'N/A'}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
