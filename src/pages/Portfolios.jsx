import React, { useEffect, useState, useContext } from 'react';
import AuthContext from "../context/AuthContext"
import AddPortfolio from '../components/AddPortfolio';
import DeletePortfolio from '../components/DeletePortfolio';
import EditPortfolio from '../components/EditPortfolio';
import StockPortfolio from '../components/StockPortfolio';



export default function Portfolios() {
  const [portfolios, setPortfolios] = useState([]);
  let {authTokens} = useContext(AuthContext)
  
  useEffect(() => {
    const fetchData = async () => {
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

    fetchData();
  }, [authTokens.access]);

  const handleAddPortfolio = (newPortfolio) => {
    setPortfolios([...portfolios, newPortfolio]);
  };

  const handleDeletePortfolio = (deletedPortfolioId) => {
    setPortfolios(portfolios.filter(portfolio => portfolio.id !== deletedPortfolioId));
  };

  const handleUpdatePortfolio = (updatedPortfolio) => {
    const updatedPortfolios = portfolios.map(p => 
      p.id === updatedPortfolio.id ? updatedPortfolio : p
    );
    setPortfolios(updatedPortfolios);
  };
   
  return (
    <div className="min-h-[70vh] flex flex-col items-center mx-5 mt-10">
      <h1 className="text-5xl font-semibold leading-tight mb-5">Portfolios</h1>
      <AddPortfolio onAdd={handleAddPortfolio} />
      <ul className="w-full md:w-2/4 mt-5">
        {portfolios.map((portfolio, index) => (
          <li key={index} className="bg-white shadow-md rounded-lg p-4 mb-4 flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold">{portfolio.portfolio_name}</h3>
              <p className="text-lightText mt-2">Total Value: {portfolio.total_value}</p>
              <StockPortfolio portfolioId={portfolio.id} />
            </div>
            <DeletePortfolio 
              portfolioId={portfolio.id} 
              onPortfolioDeleted={handleDeletePortfolio}
            />
            
            <EditPortfolio 
              portfolio={portfolio} 
              onPortfolioUpdated={handleUpdatePortfolio}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}