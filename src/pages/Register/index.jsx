import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import FormInput from "../../components/FormInput/FormInput";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const registerSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/signup`,

        {
          fullName: userName,
          email,
          password,
        }
      );
      res.data && window.location.replace("/login");
    } catch (err) {
      setError(true);
    }
  };

  return (
    <>
      <div className="auth-wrapper">
        <div className="auth-inner">
          <h1 htmlFor="form" className="d-flex justify-content-center mt-5">
            Register
          </h1>
          <form onSubmit={registerSubmit} className="container" id="form">
            <FormInput
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
              htmlForId="username"
              type="text"
              label="Username"
            />
            <FormInput
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              htmlForId="username"
              type="email"
              label="Email"
            />
            <FormInput
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              htmlForId="password"
              type="password"
              label="Password"
            />
            <button className="btn btn-primary mt-3">Register</button>
            <p className="mt-3">
              not having account <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
