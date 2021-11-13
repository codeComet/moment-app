import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./Auth.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signup } from "../../actions/auth";

const SignUp = () => {
  const [type, setType] = useState(true);
  const [confirmType, setConfirmType] = useState(true);
  const history = useHistory();
  const dispatch = useDispatch();
  const initialData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [formData, setFormData] = useState(initialData);

  const handleShowPass = () => {
    setType((prevState) => !prevState);
  };
  const handleShowConfirmPass = () => {
    setConfirmType((prevState) => !prevState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup(formData, history));
  };
  return (
    <div className="auth-container mb-4">
      <div className="signup">
        <h3 className="text-center mb-4">Sign Up for an Account</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="First Name"
              required
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Last Name"
              required
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              required
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3" style={{ position: "relative" }}>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type={type ? "password" : "text"}
              placeholder="Password"
              required
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <div
              className="icons"
              onClick={() => handleShowPass()}
              style={{
                color: "black",
                position: "absolute",
                top: "37px",
                right: "13px",
              }}
            >
              {type === true ? <FaEye /> : <FaEyeSlash />}
            </div>
          </Form.Group>

          <Form.Group className="mb-3" style={{ position: "relative" }}>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type={confirmType ? "password" : "text"}
              placeholder="Confirm password"
              required
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
            />
            <div
              className="icons"
              onClick={() => handleShowConfirmPass()}
              style={{
                color: "black",
                position: "absolute",
                top: "37px",
                right: "13px",
              }}
            >
              {confirmType === true ? <FaEye /> : <FaEyeSlash />}
            </div>
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 mt-4">
            SIGN UP
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
