import { Link } from "react-router-dom";
import "./css/Navbar.css";

import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { isAuthenticated } = useAuth();
  return (
    <nav className="navbar">
      <h1>Find my Mechanic</h1>
      <div className="links">
        <Link to="/">Generic Home</Link>
        {isAuthenticated && <Link to="/customer/booking">Seek Service</Link>}
        {isAuthenticated && (
          <Link to="/customer/profile">Customer Profile</Link>
        )}
        {isAuthenticated && <Link to="/customer/home">Customer Home Page</Link>}
        {!isAuthenticated && <Link to="/customer/sign-in">Sign In</Link>}
        {!isAuthenticated && <Link to="/customer/sign-up">Sign Up</Link>}
        {isAuthenticated && <Link to="/customer/test-page">Test Page</Link>}
      </div>
    </nav>
  );
};

export default Navbar;
