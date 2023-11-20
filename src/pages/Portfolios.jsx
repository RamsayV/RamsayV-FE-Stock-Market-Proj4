import React, { useEffect, useState, useContext } from 'react';
import AuthContext from "../context/AuthContext"


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

  return (
    <div>
      <h1>Portfolios</h1>
      <ul>
        {portfolios.map((portfolio, index) => (
          <li key={index}> 
            User: {portfolio.user.username}, Total Value: {portfolio.total_value}
          </li>
        ))}
      </ul>
    </div>
  );
}