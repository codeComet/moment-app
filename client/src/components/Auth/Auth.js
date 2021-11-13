import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./Auth.css";
import { Link, useHistory } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { signin } from "../../actions/auth";

const Auth = () => {
  const [type, setType] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const history = useHistory();

  const handleShowPass = () => {
    setType((prevState) => !prevState);
  };

  const googleOnSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      dispatch({
        type: "LOGIN",
        data: { result, token },
      });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  const googleOnFailure = () => {
    console.log("Google Sign In Failed!");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signin(formData, history));
  };

  return (
    <div className="auth-container">
      <div className="login">
        <h3 className="text-center mb-4">Login to Your Account</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group
            className="mb-3"
            controlId="formBasicPassword"
            style={{ position: "relative" }}
          >
            <Form.Label>Password</Form.Label>
            <Form.Control
              type={type ? "password" : "text"}
              placeholder="Password"
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

          <Button variant="primary" type="submit" className="w-100 mt-4">
            LOGIN
          </Button>
          <GoogleLogin
            clientId="725031431148-98vq8r72bca4dbtssddlkeidcvjjru7v.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className="btn btn-light w-100 mt-3"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                {" "}
                <FcGoogle style={{ marginRight: "5px" }} />
                Sign In with Google
              </Button>
            )}
            onSuccess={googleOnSuccess}
            onFailure={googleOnFailure}
            cookiePolicy="single_host_origin"
          />
          <Form.Label className="mt-3">
            Don't have an account? <Link to="/auth/signup">Sign up here</Link>
          </Form.Label>
        </Form>
      </div>
    </div>
  );
};

export default Auth;
