import PageNotFound from "../pages/PageNotFound/PageNotFound";
import GetValidatedTokenData from "../utils/helper";

const PrivateRoute = ({ children, accessibleTo }) => {
  const decoded = GetValidatedTokenData();

  return (
    <>
      {accessibleTo.includes(decoded.role)  ? (
        <>{children}</>
      ) : (
        <PageNotFound />
      )}
    </>
  );
};

export default PrivateRoute;
