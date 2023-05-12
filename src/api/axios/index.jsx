import axios from "axios";
const Token = localStorage.getItem("Token");

// initializing the axios instance with custom configs

const api = axios.create({
  baseURL: process.env.REACT_APP_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: `bearer ${Token}`,
  },
});

const performRequest = (url, method, body, params) => {
  return new Promise((resolve, reject) => {
    api.request({ method: method, url: url, data: body, params: params })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default performRequest;
