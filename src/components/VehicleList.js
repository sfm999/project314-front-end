import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// styles
import './VehicleList.css';

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([])
  const [url, setUrl] = useState('http://localhost:8000/vehicles')

  const fetchVehicles = useCallback(async () => {
    const response = await fetch(url)
    const json = await response.json()
    setVehicles(json)
  }, [url])

  useEffect(() => {
    fetchVehicles()
  }, [fetchVehicles])

  return (
    <div className="vehicle-list">
      <h1>Vehicle List</h1>
      <ul className="vehicle">
        {vehicles.map(vehicle => (
            <li key={vehicle.id}>
                <h2>{vehicle.make} {vehicle.model}</h2>
                <p><b>Registration:</b> {vehicle.registration}</p>
                <p><b>State:</b> {vehicle.state}</p>
            </li>
        ))}
      </ul>
      <div className="filters">
        <button onClick={() => setUrl('http://localhost:8000/vehicles?state=NSW')}>NSW Vehicles</button>
        <button onClick={() => setUrl('http://localhost:8000/vehicles')}>All Vehicles</button>
        <button onClick={() => setUrl('http://localhost:8000/vehicles?state=VIC')}>VIC Vehicles</button>
      </div>
    </div>
  );
}
 
export default VehicleList;