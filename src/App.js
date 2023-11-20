import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute"
import { AuthProvider } from "./context/AuthContext";
import Stocks from "./pages/Stocks";
import Portfolios from "./pages/Portfolios"
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"
import SignUpPage from "./pages/SignUpPage";




function App() {
  return (
    <Router>
        <AuthProvider>
        <div className="bg-red-300"></div>
      <div>
          <Navbar />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/stocks" element={<Stocks />} />
          <Route path="/portfolios" element={<Portfolios />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
        <Footer/>
      <main>

      
      
      </main>


      </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
