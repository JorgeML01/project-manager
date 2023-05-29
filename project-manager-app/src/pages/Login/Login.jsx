import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "./styles.css";

function LoginForm() {
  const history = useHistory();
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginSuccess = () => {
    setIsSubmitted(true);
    history.push("/");
    // Así se hace un refresh por el bug de los botones de sign up y sign in.
    window.location.reload();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/login/", {
        email,
        password,
      });

      // Login successful
      console.log(response.data);

      localStorage.setItem("accessToken", response.data.data.accessToken);
      localStorage.setItem("refreshToken", response.data.data.refreshToken);

      handleLoginSuccess();
    } catch (error) {
      // Login error
      if (error.response) {
        if (error.response.status === 400) {
          setErrorMessages({
            field: "credentials",
            message: "Invalid email or password.",
          });
        } else {
          setErrorMessages({
            field: "server",
            message: error.response.data.message,
          });
        }
      } else if (error.request) {
        console.error("No se recibió respuesta del servidor...");
      } else {
        console.error("Error al hacer la solicitud:", error.message);
      }
    }
  };

  const renderErrorMessage = (field) => {
    if (errorMessages.field === field) {
      return <div className="error">{errorMessages.message}</div>;
    }
    return null;
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={handleChangeEmail}
            required
          />
          {renderErrorMessage("email")}
        </div>
        <div className="input-container">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChangePassword}
            required
          />
          {renderErrorMessage("password")}
          {renderErrorMessage("credentials")}
        </div>
        <div className="button-container">
          <input type="submit" value="Login" />
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Sign In</div>
        {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
      </div>
    </div>
  );
}

export default LoginForm;
