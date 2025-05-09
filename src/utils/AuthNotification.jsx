import React, { useState, useEffect } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

const AuthNotification = ({ onClose }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setShow(false);
  }, []);

  const handleClose = () => {
    setShow(false);
    onClose();
  };

  return (
    <ToastContainer position="top-end" className="p-3">
      <Toast onClose={handleClose} show={show} delay={3000} autohide>
        <Toast.Header>
          <i
            className="bi bi-person-fill-lock"
            style={{ fontSize: 15, color: "#b97c40" }}
          ></i>
          <strong
            className="me-auto"
            style={{ fontSize: 15, padding: "0 10px" }}
          >
            Authorization Required
          </strong>
        </Toast.Header>
      </Toast>
    </ToastContainer>
  );
};

export default AuthNotification;
