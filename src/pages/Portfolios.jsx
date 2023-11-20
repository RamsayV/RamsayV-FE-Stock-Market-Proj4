import React, { useEffect, useState, useContext } from 'react';
import AuthContext from "../context/AuthContext"
// import AddPortfolio from '../components/AddPortfolio';


export default function Portfolios() {
  const [portfolios, setPortfolios] = useState([]);
  let {authTokens, logoutUser} = useContext(AuthContext)
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/portfolios/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + String(authTokens.access),
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
          logoutUser()
        }

        const data = await response.json();
        setPortfolios(data);
        console.log(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  // const handleAddPortfolio = (newPortfolio) => {
  //   setPortfolios([...portfolios, newPortfolio]);
  // };

  return (
    <div>
      <h1>Portfolios</h1>
      {/* <AddPortfolio onAdd={handleAddPortfolio} /> */}
      <ul>
        {portfolios.map((portfolio, index) => (
          <li key={index}> 
            User: {portfolio.user.username}, Portoflio Name: {portfolio.portfolio_name}
          </li>
        ))}
      </ul>
    </div>
  );
}