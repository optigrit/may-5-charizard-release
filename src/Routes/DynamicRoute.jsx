import jwt_decode from "jwt-decode";

const DynamicRoute = ({adminPage, userPage}) => {
    const Token = localStorage.getItem("Token");
    const decoded = jwt_decode(Token);
    // decoded.role = "User"
  return (
    <>
    {(decoded.role == "ADMIN" || decoded.role == "SUPERADMIN") ? adminPage : userPage}
    </>
  )
}

export default DynamicRoute