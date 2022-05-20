import { Container } from '@mui/system';
import { useState } from 'react';
import { useFetch }  from '../hooks/useFetch';

const TestPage = () => {

  const [url, setUrl] = useState('http://localhost:8000/vehicles');
  const { data: vehicles, isPending, error } = useFetch(url, { type: 'GET' });

  if(vehicles) {
    console.log(vehicles)
  }

  return (
    <Container>
      <h2>Vehicle List</h2>
      <ul>
        { vehicles && vehicles.map((vehicle) => (
          <li key={vehicle.id}>
            <h3>{ vehicle.make } { vehicle.model }</h3>
            <ul>
              <li><strong>Registration: </strong>{ vehicle.registration }</li>
            </ul>
          </li>
        ))}
      </ul>
    </Container>
    );
}
 



export default TestPage;