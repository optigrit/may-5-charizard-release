import React, { useEffect } from "react";
import { Navigate, Outlet, Route } from "react-router-dom";
import { useAuth } from "./useAuth";

function ProtechtedRoute({ children, ...rest }) {
  const { isLoggedIn, isVisible } = useAuth();
  return (
    <>
      {isVisible ? (
        //   <Route {...rest} />
        isLoggedIn ? (
          <Outlet />
        ) : (
          <Navigate to="/sign-in" />
        )
      ) : null}
    </>
  );
}

export default ProtechtedRoute;
