import jwt_decode from "jwt-decode";

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

const GetValidatedTokenData = () => {
  const token = localStorage.getItem("Token");
  if (token) {
    const decodedJwt = parseJwt(token);
    if (decodedJwt.exp * 1000 > Date.now()) {
      return jwt_decode(token);
    }
  } else { 
    // window.location.href = "/sign-in"; This line is causing infinite browser reload
  }
};

export default GetValidatedTokenData;
