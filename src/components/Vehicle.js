import { Link } from "react-router-dom";

const Vehicle = ({vehicle}) => {

    const handleClick = () => {
        // make api fetch DELETE call to remove from database
    }
    return (
        <div className="vehicle">
            <li>
                <Link to={`/vehicles/${vehicle.id}`}>
                    <h2>{vehicle.make} {vehicle.model}</h2>
                </Link>
                <p><b>Registration:</b> {vehicle.registration}</p>
                <p><b>State:</b> {vehicle.state}</p>
            </li>
            <button onClick={handleClick}>Delete</button>
        </div>
      );
}
 
export default Vehicle;