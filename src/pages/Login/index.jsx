import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import FormInput from "../../components/FormInput/FormInput";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [exception, setException] = useState("");


  const regex = new RegExp(
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );

  const mediumRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*d).{8,15}$");

  const checkEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
    if (regex.test(email)) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
  };

  function checkPassword(e) {
    e.preventDefault();
    setPassword(e.target.value);
    if (password) {
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("!emailError", emailError)
    console.log("!passwordError", passwordError)
    if (!email || !password) {
      setError(true);
    } else {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/auth/login`,
          {
            email,
            password,
          }
        );

        if (res.data) {
          localStorage.setItem("token", res.data.result.token);
          localStorage.setItem("user", JSON.stringify(res.data.result.data));
          // ----------------------

          if (res.data.result.token) {
            window.location.replace("/dashboard");
          }
        }
      } catch (error) {
        console.log(error.response);
        setException(error.response.data.message)
      }
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form className="container" onSubmit={handleSubmit}>
          <h3 className="mt-5">Sign In</h3>

          <FormInput
            onChange={checkEmail}
            value={email}
            htmlForId="username"
            label="Email"
            errors={emailError}
            errorText="Please enter valid email."

          />

          <FormInput
            onChange={checkPassword}
            value={password}
            htmlForId="password"
            type="password"
            label="Password"
            errors={passwordError}
            errorText="Please enter password."

          />

          <button className="btn btn-primary mt-3">Login</button>
          {error && (
              <p style={{ color: "red" }}>Please check all of your details</p>
            )}

{exception && (
              <p style={{ color: "red" }}>{exception}</p>
            )}

          <p className="mt-3">
            not having account <Link to="/register">Register</Link>
          </p>
        </form>
        <p></p>
      </div>
    </div>
  );
};

export default Login;
