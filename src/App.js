import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import './App.css';
import CustomerProfile from './components/CustomerProfile';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ContractorSignUp from './components/ContractorSignUp';
import ContractorSignIn from './components/ContractorSignIn';
import CustomerHomePage from './components/CustomerHomePage';
import TestPage from './components/TestPage';
import ManageVehicle from './components/ManageVehicle';
import AddVehicle from './components/AddVehicle';
import EditVehicle from './components/EditVehicle';


const customer = {
  "firstName": "Bill",
  "lastName": "Burr",
  "age": 49,
  "email": "bill@themmpodcast.com",
  "plan": "subscribed"
}

function App() {
  return (
    <Router>
    <div className="App">
      <Navbar />
      <div className="content">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/CustomerProfile" element={<CustomerProfile customer={customer}/>} /> 
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/ContractorSignUp" element={<ContractorSignUp />} />
          <Route path="/ContractorSignIn" element={<ContractorSignIn />} />
          <Route path="/CustomerHomePage" element={<CustomerHomePage />} />
          <Route path="/testing-grounds" element={<TestPage />} />
          <Route path="/manageVehicle" element={<ManageVehicle />} />
          <Route path="/addVehicle" element={<AddVehicle />} />
          <Route path="/editVehicle" element={<EditVehicle />} />
        </Routes>
      </div>
    </div>
    </Router>
  );
} 
 //<Route path="/SignIn" element={<SignIn />} />
export default App;
