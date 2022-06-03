import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
  useLocation,
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
import { useCallback, useEffect } from "react";
import axios from "./utils/axios";
import AuthGuard from "./guards/AuthGuard";

function App() {
  // const navigate = useNavigate();
  // const {pathname} = useLocation();
  const { isAuthenticated, isInitialized } = useAuth();

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
                element={<Navigate to="/customer/home" />}
              />

              <Route
                exact
                path="/customer"
                element={<Navigate to="/customer/home" />}
              />

              <Route
                exact
                path="/contractor/*"
                element={<Navigate to="/contractor/home" />}
              />

              <Route
                exact
                path="/contractor"
                element={<Navigate to="/contractor/home" />}
              />

              <Route
                exact
                path="/customer/*"
                element={<Navigate to="/customer/home" />}
              />

              <Route
                exact
                path="/customer"
                element={<Navigate to="/customer/home" />}
              />

              {/* Custome Home Page */}

              <Route
                path="/customer/home"
                element={
                  <AuthGuard role="customer">
                    <CustomerHomePage />
                  </AuthGuard>
                }
              />

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
              <Route
                path="/contractor/home"
                element={
                  <AuthGuard>
                    <ContractorHome />
                  </AuthGuard>
                }
              />
              <Route
                path="/contractor/profile"
                element={
                  <AuthGuard>
                    <ContractorProfile />
                  </AuthGuard>
                }
              />

              {/* Customer Profile Page */}
              <Route
                path="/customer/profile"
                element={
                  <AuthGuard role="customer">
                    <CustomerProfile />
                  </AuthGuard>
                }
              />

              {/* Pages for Customer Functionality */}
              <Route
                path="/customer/vehicles/manage"
                element={<ManageVehicle />}
              />
              <Route
                path="/customer/vehicles/add"
                element={
                  <AuthGuard role="customer">
                    <AddVehicle />
                  </AuthGuard>
                }
              />
              <Route
                path="/customer/vehicles/:vehicleID/edit/"
                element={<EditVehicle />}
              />
              <Route
                path="/customer/card-details"
                element={
                  <AuthGuard role="customer">
                    <CardDetails />
                  </AuthGuard>
                }
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
