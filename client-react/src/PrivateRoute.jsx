import { Navigate } from "react-router-dom";
import { useAuthContext } from "./contexts/authContext";

// eslint-disable-next-line react/prop-types
export default function PrivateRoute({ children }) {
  const { user } = useAuthContext();

  if (user?.wallet) return children;
  return <Navigate to={"/"} />;
}
