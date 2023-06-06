const internalServerError = () => {
  localStorage.clear();
  window.location.href = "/internal-server-error";
};

export default internalServerError;
