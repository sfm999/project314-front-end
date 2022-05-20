import { useContext } from "react";
import { AuthContext } from "../contexts/JWTContext";

const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};

export default useAuth;
