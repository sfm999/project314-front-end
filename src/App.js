import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";

import {
  SignIn,
  SignUp,
  CustomerProfile,
  CustomerHomePage,
  AddVehicle,
  EditVehicle,
  ManageVehicle,
  CardDetails,
} from "./components/Customer_Pages";

import {
  ContractorHome,
  ContractorProfile,
  ContractorSignIn,
  ContractorSignUp,
} from "./components/Contractor_Pages";

import TestPage from "./components/TestPage";
import InitialRequest from "./components/InitialRequest";
import useAuth from "./hooks/useAuth";

function App() {
  const { isAuthenticated, isInitialized } = useAuth();
  console.log("Is Authenticated", isAuthenticated);
  return (
    <Router>
      {isInitialized && (
        <div className="App">
          {/* Navigation component which is our navbar */}
          <Navbar />
          <div className="content">
            {/* The pages we want the router to keep track of */}
            <Routes>
              {/* Generic Home Page */}
              <Route
                exact
                path="/"
                element={
                  isAuthenticated ? (
                    <Navigate to="/customer/home" />
                  ) : (
                    <Navigate to="/customer/sign-in" />
                  )
                }
              />

              <Route
                exact
                path="/customer"
                element={
                  isAuthenticated ? (
                    <Navigate to="/customer/home" />
                  ) : (
                    <Navigate to="/customer/sign-in" />
                  )
                }
              />

              {/* Custome Home Page */}
              <Route path="/customer/home" element={<CustomerHomePage />} />

              {/* Customer(?) sign in and sign up */}
              <Route path="/customer/sign-in" element={<SignIn />} />
              <Route path="/customer/sign-up" element={<SignUp />} />

              {/* Contractor sign in and sign up */}
              <Route
                path="/contractor/sign-up"
                element={<ContractorSignUp />}
              />
              <Route
                path="/contractor/sign-in"
                element={<ContractorSignIn />}
              />

              {/* Contractor Home Page and Profile */}
              <Route path="/contractor/home" element={<ContractorHome />} />
              <Route
                path="/contractor/profile"
                element={<ContractorProfile />}
              />

              {/* Customer Profile Page */}
              <Route path="/customer/profile" element={<CustomerProfile />} />

              {/* Pages for Customer Functionality */}
              <Route
                path="/customer/vehicles/manage"
                element={<ManageVehicle />}
              />
              <Route path="/customer/vehicles/add" element={<AddVehicle />} />
              <Route
                path="/customer/vehicles/:vehicleID/edit/"
                element={<EditVehicle />}
              />
              <Route path="/customer/card-details" element={<CardDetails />} />

              {/* Just a page to test things out on */}
              <Route path="/customer/test-page" element={<TestPage />} />

              {/*Adding this to test the location stuff for requests */}
              <Route
                path="/customer/InitialRequest"
                element={<InitialRequest />}
              />
            </Routes>
            {/* END ROUTES */}
          </div>
        </div>
      )}
    </Router>
  );
}
//<Route path="/SignIn" element={<SignIn />} />
export default App;
