import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import FormInput from "../../components/FormInput/FormInput";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [userNameError, setUserNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [exception, setException] = useState("");
  const [serverError, setServerError] = useState(false);

  const regex = new RegExp(
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );

  

  const mediumRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*d).{8,15}$");

  // function
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

  function checkUserName(e) {
    e.preventDefault();
    setUserName(e.target.value);
    if (userName !== "") {
      setUserNameError(false);
    } else {
      setUserNameError(true);
    }
  }
  const registerSubmit = async (e) => {
    e.preventDefault();
    if (!userName || !password || !email) {
      setError(true);
    } else {
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
        console.log("error.response.data", err)
        console.log("err.response.data", )
        let key = Object.keys(err.response.data.errors[0]);

        if(err.response.data.errors[0][key[0]].message) {
          setException(err.response.data.errors[0][key[0]].message)
        } else {
          setException(`${err.response.data.errors[0][key[0]]} for ${key[0]}`)

        }
        

      }
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
              onChange={checkUserName}
              value={userName}
              htmlForId="username"
              type="text"
              label="Username"
              errors={userNameError}
              errorText="Please enter userName"
            />

            <FormInput
              onChange={checkEmail}
              value={email}
              htmlForId="email"
              label="Email"
              errors={emailError}
              errorText="Please enter valid email"
            />
            <FormInput
              onChange={checkPassword}
              value={password}
              htmlForId="password"
              type="password"
              label="Password"
              errors={passwordError}
              errorText="Please enter password"

            />

            <button className="btn btn-primary mt-3">Register</button>
            {error && (
              <p style={{ color: "red" }}>Please check all of your details</p>
            )}
            {exception && (
              <p style={{ color: "red" }}>{exception}</p>
            )}
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
