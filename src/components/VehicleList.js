import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';

// styles
import './css/VehicleList.css';

const VehicleList = () => {
  const [url, setUrl] = useState('http://localhost:8000/vehicles')
  const { data: vehicles, isPending, error } = useFetch(url)
  const [showVehicles, setShowVehicles] = useState(true)

  return (
    <div className="vehicle-list">
      <h1>Vehicle List</h1>
      <button onClick={() => setShowVehicles(!showVehicles)}>Show Vehicles</button>
      {isPending && <div>Loading vehicles...</div>}
      {error && <div>{error}</div>}
      {showVehicles && <ul className="vehicle">
        {vehicles && vehicles.map(vehicle => (
            <li key={vehicle.id}>
                <h2>{vehicle.make} {vehicle.model}</h2>
                <p><b>Registration:</b> {vehicle.registration}</p>
                <p><b>State:</b> {vehicle.state}</p>
            </li>
        ))}
      </ul>}
      {showVehicles && <div className="filters">
        <button onClick={() => setUrl('http://localhost:8000/vehicles?state=NSW')}>NSW Vehicles</button>
        <button onClick={() => setUrl('http://localhost:8000/vehicles')}>All Vehicles</button>
        <button onClick={() => setUrl('http://localhost:8000/vehicles?state=VIC')}>VIC Vehicles</button>
      </div>}
    </div>
  );
}
 
export default VehicleList;