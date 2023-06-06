import axios from "axios";
import handleError from "../errors";

const performRequest = (url, method, body, params) => {
  // initializing the axios instance with custom configs
  const Token = localStorage.getItem("Token");

  const api = axios.create({
    baseURL: process.env.REACT_APP_URL,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `bearer ${Token}`,
    },
  });

  return new Promise((resolve, reject) => {
    api
      .request({ method: method, url: url, data: body, params: params })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        handleError(error);
      });
  });
};

export default performRequest;
