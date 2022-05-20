import { Link } from "react-router-dom";
import "./css/Navbar.css";

import useAuth from "../hooks/useAuth";

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>Find my Mechanic</h1>
            <div className="links">
                <Link to="/">Generic Home</Link>
                <Link to="/booking">Seek Service</Link>
                <Link to="/customerprofile">Customer Profile</Link>
                <Link to="/CustomerHomePage">Customer Home Page</Link>
                <Link to="/signin">Sign In</Link>
                <Link to="/signup">Sign Up</Link>
                <Link to="/testpage">Test Page</Link>
            </div>
        </nav>
      );
}
 
export default Navbar;
