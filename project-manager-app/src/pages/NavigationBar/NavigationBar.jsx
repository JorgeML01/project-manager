import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import React, { useState } from "react";

function NavigationBar() {
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckLoginStatusDone, setIsCheckLoginStatusDone] = useState(false);

  function checkLoginStatus() {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (accessToken && refreshToken) {
      console.log("LOGGED");
      setIsLoggedIn(true);
    } else {
      console.log("NOT LOGGED");
      setIsLoggedIn(false);
    }

    setIsCheckLoginStatusDone(true);
  }

  function handleLogout() {
    localStorage.clear();
    setIsLoggedIn(false);
    history.push("/login");
  }

  if (!isCheckLoginStatusDone) {
    checkLoginStatus();
  }

  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container fluid>
        <Navbar.Brand href="/">
          <img
            src="/navbar/logo4.png"
            height="40px"
            className="d-inline-block align-top"
            alt="Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Button href="/" variant="dark">
              Home
            </Button>
            <Button href="/about" variant="dark">
              About
            </Button>
            <Button href="/contact" variant="dark">
              Contact
            </Button>
            {!isLoggedIn && (
              <>
                <Button href="/login" variant="dark" className="d-lg-none">
                  Sign in
                </Button>
                <Button href="/register" variant="dark" className="d-lg-none">
                  Sign up
                </Button>
              </>
            )}
            {isCheckLoginStatusDone && isLoggedIn && (
              <>
                <Button href="/boards" variant="dark">
                  Boards
                </Button>
                <Button
                  onClick={handleLogout}
                  variant="dark"
                  className="d-lg-none"
                >
                  Log out
                </Button>
              </>
            )}
          </Nav>
          {isCheckLoginStatusDone && (
            <>
              {isLoggedIn ? (
                <>
                  <Button
                    onClick={handleLogout}
                    variant="dark"
                    className="d-none d-lg-block"
                  >
                    Log out
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    href="/login"
                    variant="dark"
                    className="d-none d-lg-block"
                  >
                    Sign in
                  </Button>
                  <Button
                    href="/register"
                    variant="dark"
                    className="d-none d-lg-block"
                  >
                    Sign up
                  </Button>
                </>
              )}
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
