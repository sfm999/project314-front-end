import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import './App.css';
import CustomerProfile from './components/Customer_Pages/CustomerProfile';
import SignIn from './components/Customer_Pages/SignIn';
import SignUp from './components/Customer_Pages/SignUp';
import ContractorSignUp from './components/Contractor_Pages/ContractorSignUp';
import ContractorSignIn from './components/Contractor_Pages/ContractorSignIn';
import ContractorProfile from './components/Contractor_Pages/ContractorProfile';
import ContractorHome from './components/Contractor_Pages/ContractorHome';
import CustomerHomePage from './components/Customer_Pages/CustomerHomePage';
import TestPage from './components/TestPage';
import ManageVehicle from './components/Customer_Pages/ManageVehicle';
import AddVehicle from './components/Customer_Pages/AddVehicle';
import EditVehicle from './components/Customer_Pages/EditVehicle';
import PaymentProcess from './components/Customer_Pages/PaymentProcess';




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

            {/* Contractor Home Page and Profile */}
            <Route path="/ContractorHome" element={<ContractorHome />} />
            <Route path="/ContractorProfile" element={<ContractorProfile />} />

            {/* Customer Profile Page */}
            <Route path="/CustomerProfile" element={<CustomerProfile />} />

          {/* Customer Profile Page */}
          <Route path="/CustomerProfile" element={<CustomerProfile />} />

          {/* Pages for Customer Functionality */}
          <Route path="/manageVehicles" element={<ManageVehicle />} />
          <Route path="/addVehicle" element={<AddVehicle />} />
          <Route path="/editVehicle" element={<EditVehicle />} />
          <Route path="/paymentProcess" element={<PaymentProcess />} />

          {/* Just a page to test things out on */}
          <Route path="/testpage" element={<TestPage />} />

        </Routes>
        {/* END ROUTES */}
        </div>
      </div>
    </Router>
  );
}
//<Route path="/SignIn" element={<SignIn />} />
export default App;
