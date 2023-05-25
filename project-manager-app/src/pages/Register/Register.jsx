import React, { useState } from "react";
import axios from "axios";
import "./styles.css";

function RegisterForm() {
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/register/", {
        email,
        password,
      });

      // Registration successful
      setIsSubmitted(true);
      console.log(response.data);
    } catch (error) {
      // Registration error
      if (error.response) {
        if (error.response.status === 400) {
          setErrorMessages({
            field: "credentials",
            message: "Invalid email or password.",
          });
        } else if (error.response.status === 500) {
          setErrorMessages({
            field: "credentials",
            message: "The email already exists.",
          });
        } else {
          setErrorMessages({
            field: "server",
            message: error.response.data.error,
          });
        }
      } else if (error.request) {
        console.error("No se recibió respuesta del servidor...");
      } else {
        console.error("Error al hacer la solicitud:", error.message);
      }
    }
  }

  function renderErrorMessage(field) {
    if (errorMessages.field === field) {
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
          <input type="submit" value="Register" />
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Sign Up</div>
        {isSubmitted ? <div>User is successfully registered</div> : renderForm}
      </div>
    </div>
  );
}

export default RegisterForm;
