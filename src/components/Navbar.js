import { Link } from "react-router-dom";
import "./css/Navbar.css";

import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { isAuthenticated } = useAuth();
  const role = window.localStorage.getItem("role");

  return (
    <nav className="navbar">
      <h1>Find my Mechanic</h1>
      <div className="links">
        {/* <Link to="/">Generic Home</Link> */}

        {isAuthenticated && role === "S" && (
          <Link to="/contractor/home">Contractor Home Page</Link>
        )}

        {isAuthenticated && role === "S" && (
          <Link to="/contractor/profile">Contractor Profile</Link>
        )}

        {!isAuthenticated && role === "S" && (
          <Link to="/contractor/sign-in">Sign in</Link>
        )}

        {!isAuthenticated && role === "S" && (
          <Link to="/contractor/sign-up">Sign up</Link>
        )}

        {isAuthenticated && role === "C" && (
          <Link to="/customer/booking">Seek Service</Link>
        )}
        {isAuthenticated && role === "C" && (
          <Link to="/customer/profile">Customer Profile</Link>
        )}
        {isAuthenticated && role === "C" && (
          <Link to="/customer/home">Customer Home Page</Link>
        )}
        {!isAuthenticated && role === "C" && (
          <Link to="/customer/sign-in">Sign In</Link>
        )}
        {!isAuthenticated && role === "C" && (
          <Link to="/customer/sign-up">Sign Up</Link>
        )}
        {isAuthenticated && role === "C" && (
          <Link to="/customer/test-page">Test Page</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
