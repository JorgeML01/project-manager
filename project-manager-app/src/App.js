import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavigationBar from "./pages/NavigationBar/NavigationBar";
import Footer from "./pages/Footer/Footer";
import Slider from "./components/Slider";
import MainPageImages from "./components/MainPageImages/MainPageImages";
import LoginForm from "./pages/Login/Login";
import RegisterForm from "./pages/Register/Register";
import AboutInfo from "./pages/About/About";
import ContactInfo from "./pages/Contact/Contact";
import Dashboard from "./pages/Dashboard/Dashboard";

const Home = () => {
  return (
    <>
      <Slider />
      <MainPageImages />
    </>
  );
};

const About = () => {
  return (
    <>
      <AboutInfo />
    </>
  );
};

const Contact = () => {
  return (
    <>
      <ContactInfo />
    </>
  );
};

const Login = () => {
  return (
    <>
      <LoginForm />
    </>
  );
};

const Register = () => {
  return (
    <>
      <RegisterForm />
    </>
  );
};

const Boards = () => {
  return (
    <>
      <Dashboard />
    </>
  );
};

function App() {
  return (
    <Router>
      <>
        <NavigationBar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/contact">
            <Contact />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/boards">
            <Boards />
          </Route>
          <Route>{/* Componente para la página de error 404 */}</Route>
        </Switch>
        <Footer />
      </>
    </Router>
  );
}

export default App;
