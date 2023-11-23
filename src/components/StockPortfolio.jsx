import React, { useState, useEffect, useContext } from 'react';
import AuthContext from "../context/AuthContext";

const StockPortfolio = ({ portfolioId }) => {
  const [stockDetails, setStockDetails] = useState([]);
  const { authTokens } = useContext(AuthContext);

  useEffect(() => {
    const fetchStockDetails = async () => {
      try {
        // Update the API call to filter stock portfolios by the given portfolio ID
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/stockportfolios/?portfolio=${portfolioId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + String(authTokens.access),
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setStockDetails(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    if (portfolioId) { // Only fetch stock details if a portfolio ID is provided
      fetchStockDetails();
    }
  }, [portfolioId, authTokens.access]);

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="block text-gray-700 text-xl font-bold mb-2">Portfolio Details</h2>
      <ul>
        {stockDetails.map((stock, index) => (
          <li key={index} className="border-b border-gray-200 py-3">
            <div className="flex items-center justify-between">
              <div className="text-gray-600">
                <p>{stock.quantity} shares of {stock.company_name} ({stock.ticker_symbol})</p>
                <p className="text-sm text-gray-500">In {stock.portfolio_name} Portfolio</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StockPortfolio;