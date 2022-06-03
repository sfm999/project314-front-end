import { useState } from "react";

import { Navigate, useLocation } from "react-router-dom";

import useAuth from "../hooks/useAuth";

import { SignIn as CustomerSignIn } from "../components/Customer_Pages";
import { ContractorSignIn } from "../components/Contractor_Pages";

export default function AuthGuard({ role = "contractor", children }) {
  const { isAuthenticated, isInitialized } = useAuth();

  const { pathname } = useLocation();

  const [requestedLocation, setRequestedLocation] = useState(null);

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    if (role === "contractor") {
      return <ContractorSignIn />;
    }

    return <CustomerSignIn />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
}
