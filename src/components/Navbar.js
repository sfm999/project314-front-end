import { Link } from 'react-router-dom';
import './css/Navbar.css';


const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>Find my Mechanic</h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/booking">Seek Service</Link>
                <Link to="/customerprofile">Profile</Link>
                <Link to="/signin">Sign In</Link>
                <Link to="/signup">Sign Up</Link>
            </div>
        </nav>
      );
}
 
export default Navbar;