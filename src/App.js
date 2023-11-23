import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import PrivateRoute from "./utils/PrivateRoute"
import { AuthProvider } from "./context/AuthContext";
import Stocks from "./pages/Stocks";
import Portfolios from "./pages/Portfolios"
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"
import SignUpPage from "./pages/SignUpPage";
import Dashboard from "./pages/Dashboard";
import StockContext from "./context/StockContext";







function App() {
const [stockSymbol, setStockSymbol] = useState("FB")
  return (
    <Router>
        <AuthProvider>
      <StockContext.Provider value={{stockSymbol, setStockSymbol}}>
        <div className="bg-red-300"></div>
      <div>
          <Navbar />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/stocks" element={<Stocks />} />
          <Route path="/portfolios" element={<Portfolios />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
        <Footer/>
      <main>

      
      
      </main>


      </div>
      </StockContext.Provider>
      </AuthProvider>
    </Router>
  );
}

export default App;
