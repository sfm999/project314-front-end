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
        {isAuthenticated && <Link to="/booking">Seek Service</Link>}
        {isAuthenticated && <Link to="/customerprofile">Customer Profile</Link>}
        {isAuthenticated && (
          <Link to="/CustomerHomePage">Customer Home Page</Link>
        )}
        <Link to="/signin">Sign In</Link>
        <Link to="/signup">Sign Up</Link>
      </div>
    </nav>
  );
};

export default Navbar;
