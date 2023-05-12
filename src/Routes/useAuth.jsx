// import { useEffect } from "react";
// import { useState } from "react";

// export const useAuth = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [isVisible, setIsVisible] = useState(false);

//   const parseJwt = (token) => {
//     try {
//       return JSON.parse(atob(token.split('.')[1]));
//     } catch (e) {
//       return null;
//     }
//   };

//   const validateToken = () => {
//     const token = localStorage.getItem("Token");
//     if (token) {
//       const decodedJwt = parseJwt(token);
//       if (decodedJwt.exp * 1000 > Date.now()) {
//         return true
//       }
//     }
//     return false
//   };

//   useEffect(() => {
//     if (validateToken()) {
//       setIsLoggedIn(true);
//       setIsVisible(true);
//     } else {
//       setIsLoggedIn(false);
//       setIsVisible(true);
//     }
//   }, []);
//   return { isLoggedIn, isVisible };
// };

import { async } from "@firebase/util";
import React, { useEffect } from "react";
import { useState } from "react";

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("Token")) {
      setIsLoggedIn(true);
      setIsVisible(true);
    } else {
      setIsLoggedIn(false);
      setIsVisible(true);
    }
  }, []);
  return { isLoggedIn, isVisible };
};
