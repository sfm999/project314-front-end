import { useState } from "react";

import { Navigate, useLocation } from "react-router-dom";

import useAuth from "../hooks/useAuth";

import { SignIn as CustomerSignIn } from "../components/Customer_Pages";
import { ContractorSignIn } from "../components/Contractor_Pages";

export default function AuthGuard({ role = "contractor", children }) {
  const { isAuthenticated, logout } = useAuth();

  const { pathname } = useLocation();

  const [requestedLocation, setRequestedLocation] = useState(null);


  const storedRole = window.localStorage.getItem("role");

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    if (role === "contractor") {
      return <ContractorSignIn />;
    }

    return <CustomerSignIn />;
  }

  if(isAuthenticated && ((storedRole === 'C' && role !== 'customer') || (storedRole!=='C' && role ==='customer')))
  {
      logout();
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
}
