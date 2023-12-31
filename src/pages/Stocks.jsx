import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from "../context/AuthContext";
import AddStock from '../components/AddStock';
import AddStockPortfolio from '../components/AddStockPortfolio';
import DeleteStocks from '../components/DeleteStocks';
import EditStock from '../components/EditStock';


export default function Stocks() {
  const [showAddStockForm, setShowAddStockForm] = useState(false);
  const [showAddStockPortfolio, setShowAddStockPortfolio] = useState(false);
  const [portfolios, setPortfolios] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [isupdated, setIsUpdated] = useState(false)
  const [isEditing, setIsEditing] = useState(false); 
  let { authTokens} = useContext(AuthContext);

   useEffect(() => {
    const stockData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/stocks/`, {
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
        console.log(isupdated);
        setIsUpdated(false)
      } catch (error) {
        console.error('Error:', error);
        
      }
    };

    stockData();
  }, [authTokens.access, isupdated]); 

  useEffect(() => {

    const fetchPortfolios = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/portfolios/`, {
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
        setPortfolios(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchPortfolios();
  }, [authTokens.access, isupdated] );

  const handleStockClick = (stock) => {
    if (selectedStock && selectedStock.id === stock.id) {
      setSelectedStock(null);
    } else {
      setSelectedStock(stock);
    }

  };

  const handleStockAdded = async () => {
    setShowAddStockForm(false);
    setShowAddStockPortfolio(true);
  };

  const handleStockUpdated = () => {
    setIsUpdated(true);
    setIsEditing(false);
    setSelectedStock(null);
  };

  const handleStockDeleted = (deletedStockId) => {
    setStocks(stocks.filter(stock => stock.id !== deletedStockId));
    setSelectedStock(null); 
    setIsEditing(false); 
  };

  const toggleAddStockForm = () => {
    setShowAddStockForm(!showAddStockForm);
  };

  const handleStockPortfolioAdded = () => {
    setShowAddStockPortfolio(false); 
    setIsUpdated(true); 
  };

  return (
  <div className="min-h-[70vh] flex flex-col items-center md:mx-32 mx-5 mt-10">
  <div className="text-center w-full">
    <h1 className="text-5xl font-semibold text-brightGreen mb-2">Stocks</h1>
   <Link to="/dashboard"> <p className="text-lg text-lightText mb-5">Explore real-time stock market data and insights.</p></Link>
    <button 
          onClick={toggleAddStockForm}
          className="text-white bg-brightGreen hover:bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-4"
        >
          {showAddStockForm ? 'Close Form' : 'Add Stock'}
        </button>

    {showAddStockForm && <AddStock onStockAdded={handleStockAdded} setIsUpdated={setIsUpdated} />}
    {showAddStockPortfolio && <AddStockPortfolio stocks={stocks} portfolios={portfolios} setIsUpdated={setIsUpdated} onStockPortfolioAdded={handleStockPortfolioAdded} />}

    {selectedStock && !isEditing ? (
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
        <button
          onClick={() => setIsEditing(true)}
          className="text-white bg-brightGreen hover:bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5 mr-2"
        >
          Edit
        </button>
        <button
          onClick={() => setSelectedStock(null)}
          className="text-white bg-gray-500 hover:bg-gray-700 font-medium rounded-lg text-sm px-5 py-2.5 mr-2"
        >
          Back to List
        </button>
        <DeleteStocks stockId={selectedStock.id} onStockDeleted={handleStockDeleted} />
      </div>
    ) : null}

    {selectedStock && isEditing ? (
      // Editing, show the EditStock form
      <EditStock
        selectedStock={selectedStock}
        onStockUpdated={handleStockUpdated}
        setIsUpdated={setIsUpdated}
      />
    ) : null}

    {!selectedStock && (
      // Stock list view
      <div>
        
        <div className="grid md:grid-cols-2 gap-4">
          {stocks.map((stock, index) => (
            <div 
              key={index} 
              className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer" 
              onClick={() => handleStockClick(stock)}
            >
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