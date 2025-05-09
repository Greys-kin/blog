import React from "react";

export const serverError = (isError, isAuthError, ...errorMessage) => {
  if (isError && isAuthError) {
    return (
      <div
        className="alert alert-danger"
        role="alert"
        style={{ marginBottom: "5px" }}
      >
        {errorMessage}
      </div>
    );
  } else if (isError) {
    return (
      <div className="alert alert-danger" role="alert">
        An error occurred. Please try again later.
      </div>
    );
  }
  return null;
};
