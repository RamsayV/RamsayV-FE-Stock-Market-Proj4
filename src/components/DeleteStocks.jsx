import React, { useContext } from 'react';
import AuthContext from "../context/AuthContext"; 

const DeleteStocks = ({ stockId, onStockDeleted }) => {
  const { authTokens } = useContext(AuthContext);

  const handleDelete = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/stocksdelete/${stockId}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + String(authTokens.access), 
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      onStockDeleted(stockId);
    } catch (error) {
      console.error('Error:', error);
      
    }
  };

  return (
    <button 
      onClick={handleDelete} 
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      type="button"
    >
      Delete
    </button>
  );
};
export default DeleteStocks;