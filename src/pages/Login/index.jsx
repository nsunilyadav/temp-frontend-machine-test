import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import FormInput from "../../components/FormInput/FormInput";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      console.log(error);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form className="container" onSubmit={handleSubmit}>
          <h3 className="mt-5">Sign In</h3>

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
          <button className="btn btn-primary mt-3">Login</button>
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
