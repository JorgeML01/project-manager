import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function NavigationBar() {
  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container fluid>
        <Navbar.Brand href="/">
          <img
            src="/navbar/logo2.png"
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
            <Button variant="dark" className="d-lg-none">
              Sign in
            </Button>
            <Button variant="dark" className="d-lg-none">
              Sign up
            </Button>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-secondary">Search</Button>
          </Form>
        </Navbar.Collapse>
        <Button variant="dark" className="d-none d-lg-block">
          Sign in
        </Button>
        <Button variant="dark" className="d-none d-lg-block">
          Sign up
        </Button>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
