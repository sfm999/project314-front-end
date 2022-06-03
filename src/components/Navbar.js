import { Link, useLocation } from "react-router-dom";
import "./css/Navbar.css";

import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const role = window.localStorage.getItem("role");
  const { pathname } = useLocation();
  const isCustomer = pathname.includes("customer");

  return (
    <nav className="navbar">
      <h1>Find my Mechanic</h1>
      <div className="links" style={{ marginRight: 40, marginBottom: 10 }}>
        {/* <Link to="/">Generic Home</Link> */}
        {isAuthenticated && isCustomer && <Link onClick={() => {logout();}} to="/customer/sign-in">Sign Out</Link>}

        {isAuthenticated && !isCustomer && <Link onClick={() => {logout();}} to="/contractor/sign-in">Sign Out</Link>}

        {isAuthenticated && role === "S" && (
          <Link to="/contractor/home">Home</Link>
        )}

        {isAuthenticated && role === "S" && (
          <Link to="/contractor/profile">Profile</Link>
        )}

        {!isAuthenticated && !isCustomer && (
          <Link to="/contractor/sign-in">Sign in</Link>
        )}

        {!isAuthenticated && !isCustomer && (
          <Link to="/contractor/sign-up">Sign up</Link>
        )}
        {/* 
        {isAuthenticated && role === "C" && (
          <Link to="/customer/booking">Seek Service</Link>
        )} */}

        {isAuthenticated && role === "C" && (
          <Link to="/customer/profile">Profile</Link>
        )}
        {isAuthenticated && role === "C" && (
          <Link to="/customer/home">Home</Link>
        )}
        {!isAuthenticated && isCustomer && (
          <Link to="/customer/sign-in">Sign In</Link>
        )}
        {!isAuthenticated && isCustomer && (
          <Link to="/customer/sign-up">Sign Up</Link>
        )}

        

      </div>
    </nav>
  );
};

export default Navbar;
