import React, { useState } from "react";
import axios from "axios";
import "./styles.css";

function LoginForm() {
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/login/", {
        email,
        password,
      });

      // Login successful
      setIsSubmitted(true);
      console.log(response.data);
    } catch (error) {
      // Login error
      if (error.response) {
        setErrorMessages({
          name: "server",
          message: error.response.data.message,
        });
      } else if (error.request) {
        console.error("No se recibió respuesta del servidor...");
      } else {
        console.error("Error al hacer la solicitud:", error.message);
      }
    }
  }

  function renderErrorMessage(name) {
    if (errorMessages.name === name) {
      return <div className="error">{errorMessages.message}</div>;
    }
    return null;
  }

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
          <label>Username</label>
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
