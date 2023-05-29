import React from "react";
import "./styles.css";

function decodeToken(token) {
  const payload = token.split(".")[1];
  const decodedPayload = atob(payload);
  const parsedPayload = JSON.parse(decodedPayload);
  return parsedPayload;
}

function Dashboard() {
  const token = localStorage.getItem("accessToken");
  const decodedToken = decodeToken(token);
  const email = decodedToken.email;

  return (
    <section id="dashboard" role="dashboard">
      <div className="container">
        <div className="board">
          <h2>Board name</h2>
          <p>Board description</p>
          <p>Your email: {email}</p>
        </div>
      </div>
    </section>
  );
}
export default Dashboard;
