import React, { useEffect, useState, useContext } from 'react';
import AuthContext from "../context/AuthContext";

export default function Stocks() {
  const [stocks, setStocks] = useState([]);
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

  return (
    <div>
      <h1>Stocks</h1>
      <ul>
        {stocks.map((stock, index) => (
          <li key={index}>
            Company Name: {stock.company_name},  
            Ticker Symbol: {stock.ticker_symbol}, 
            Market Price: {stock.market_price},
            Open Price: {stock.open_price ? stock.open_price : 'N/A'},  
            Close Price: {stock.close_price ? stock.close_price : 'N/A'},
            52 Week High: {stock.week_52_high ? stock.week_52_high : 'N/A'},
            52 Week Low: {stock.week_52_low ? stock.week_52_low : 'N/A'}
          </li>
        ))}
      </ul>
    </div>
  );
}