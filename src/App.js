import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute"
import { AuthProvider } from "./context/AuthContext";
import Portfolios from "./pages/Portfolios";
import Stocks from "./pages/Stocks";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Nav from "./components/Nav";


function App() {
  return (
    <Router>
        <AuthProvider>
      <div>
          <Nav />
        <Routes>
          <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/stocks" element={<Stocks />} />
          <Route path="/portfolios" element={<Portfolios />} />
        </Routes>
      </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
