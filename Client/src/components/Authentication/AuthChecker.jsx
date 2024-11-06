import { Navigate, Outlet, useLocation } from "react-router-dom";
import jwtDecode from "jwt-decode"; // Make sure to install jwt-decode

// Custom hook to check if the user is authenticated
const useAuth = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return false; // No token means the user is not logged in
  }

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    // Check if the token is expired
    if (decodedToken.exp < currentTime) {
      localStorage.removeItem("token"); // Remove expired token
      return false;
    }

    return true; // Token is valid and not expired
  } catch (error) {
    console.error("Invalid token:", error);
    return false;
  }
};

function AuthChecker() {
  const isLoggedIn = useAuth(); // Check if the user is authenticated
  const location = useLocation();

  if (!isLoggedIn) {
    return (
      <Navigate
        to="/login"
        state={{
          message: "You must log in first",
          from: location.pathname, // Redirect the user back to the page they tried to access
        }}
        replace
      />
    );
  }

  return <Outlet />; // Proceed to the route if the user is authenticated
}

export default AuthChecker;
