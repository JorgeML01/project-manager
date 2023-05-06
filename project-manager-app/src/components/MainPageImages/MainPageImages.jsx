import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function MainPageImages() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-4 col-md-4 col-sm-12">
          <div className="d-flex justify-content-center align-items-center main-page-tile">
            <img
              src="MainPageImages/board1.png"
              className="img-fluid"
              alt="Imagen 1"
            />
          </div>
        </div>
        <div className="col-lg-4 col-md-4 col-sm-12">
          <div className="d-flex justify-content-center align-items-center main-page-tile">
            <img
              src="MainPageImages/board2.png"
              className="img-fluid"
              alt="Imagen 2"
            />
          </div>
        </div>
        <div className="col-lg-4 col-md-4 col-sm-12">
          <div className="d-flex justify-content-center align-items-center main-page-tile">
            <img
              src="MainPageImages/board3.png"
              className="img-fluid"
              alt="Imagen 3"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPageImages;
