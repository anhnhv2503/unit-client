import { Navigate, Outlet, useLocation } from "react-router-dom";

const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

const isAuthenticated = () => {
  return !!getAccessToken();
};

export const ProtectedRoute = () => {
  const location = useLocation();
  if (!isAuthenticated()) {
    console.log(location);
    localStorage.setItem(
      "redirectAfterLogin",
      location.search ? location.pathname + location.search : location.pathname
    );
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
