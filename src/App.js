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
      {/* Navigation component which is our navbar */}
      <Navbar />
      <div className="content">
        {/* The pages we want the router to keep track of */}
        <Routes>

          {/* Generic Home Page */}
          <Route exact path="/" element={<Home />} />

          {/* Custome Home Page */}
          <Route path="/CustomerHomePage" element={<CustomerHomePage />} />

          {/* Customer(?) sign in and sign up */}
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />

          {/* Contractor sign in and sign up */}
          <Route path="/ContractorSignUp" element={<ContractorSignUp />} />
          <Route path="/ContractorSignIn" element={<ContractorSignIn />} />

          {/* Customer Profile Page */}
          <Route path="/CustomerProfile" element={<CustomerProfile customer={customer}/>} />

          {/* Pages for Customer Functionality */}
          <Route path="/manageVehicles" element={<ManageVehicle />} />
          <Route path="/addVehicle" element={<AddVehicle />} />
          <Route path="/editVehicle" element={<EditVehicle />} />

          {/* Just a page to test things out on */}
          <Route path="/testing-grounds" element={<TestPage />} />

        </Routes>
        {/* END ROUTES */}
      </div>
    </div>
    </Router>
  );
} 
 //<Route path="/SignIn" element={<SignIn />} />
export default App;
