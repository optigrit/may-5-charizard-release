import forbiddenError from "./ForbiddenError";
import unAuthorizedError from "./UnAuthorizedError";
import internalServerError from "./InternalServerError";
import notFoundError from "./NotFoundError";
import badRequestError from "./BadRequestError";

const handleError = (error) => {
  if (error.response.data === "Invalid or expired token") {
    unAuthorizedError();
  } else if (
    error.response.data === "You are not allowed to do this operation"
  ) {
    forbiddenError();
  } else if (error.response.data === "internal server error") {
    internalServerError();
  } else if (error.response.data === "not found error") {
    notFoundError();
  } else if (error.response.data === "bad request error") {
    badRequestError();
  }
};

export default handleError;
