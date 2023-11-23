import React, { useState, useContext } from 'react';
import AuthContext from "../context/AuthContext";

const EditPortfolio = ({ portfolio, onPortfolioUpdated }) => {
    const [editMode, setEditMode] = useState(false);
  const [editedName, setEditedName] = useState(portfolio.portfolio_name);
  const { authTokens } = useContext(AuthContext);

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/portfolioedit/${portfolio.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + String(authTokens.access),
        },
        body: JSON.stringify({ portfolio_name: editedName }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const updatedPortfolio = await response.json();
      onPortfolioUpdated(updatedPortfolio);
      setEditMode(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  return (
    <div>
      {editMode ? (
        <form onSubmit={handleEditSubmit}>
          <input 
            type="text" 
            value={editedName} 
            onChange={(e) => setEditedName(e.target.value)} 
            className="border-2 border-gray-300 p-2 rounded"
          />
          <button 
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
          >
            Save
          </button>
          <button onClick={toggleEditMode} className="ml-2">Cancel</button>
        </form>
      ) : (
        <>
          <span>{portfolio.portfolio_name}</span>
          <button onClick={toggleEditMode} className="ml-2">Edit</button>
        </>
      )}
    </div>
  );
};

export default EditPortfolio;