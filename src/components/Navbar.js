import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>Find my Mechanic</h1>
            <div className="links">
                <Link to="/booking">Seek Service</Link>
                <Link to="/profile">Profile</Link>
                <Link to="/">Home</Link>
            </div>
        </nav>
      );
}
 
export default Navbar;