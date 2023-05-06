// import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavigationBar from "./pages/NavigationBar/NavigationBar";
import Footer from "./pages/Footer/Footer";
import Slider from "./components/Slider";
import MainPageImages from "./components/MainPageImages/MainPageImages";
import LoginForm from "./pages/Login/Login";

const Home = () => {
  return (
    <>
      {/* <h1 id="title">Project Manager</h1> */}
      <Slider />
      <MainPageImages />
    </>
  );
};

const About = () => {
  return (
    <>
      <h1>About</h1>
    </>
  );
};

const Contact = () => {
  return (
    <>
      <h1>Contact</h1>
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
      <h1>register</h1>
    </>
  );
};

function App() {
  return (
    <>
      {/* header */}
      {/* navigation */}
      <NavigationBar />
      {/* body */}
      <Router>
        <Switch>
          <Route exact path="/">
            {Home}
          </Route>
          <Route exact path="/about">
            {About}
          </Route>
          <Route exact path="/contact">
            {Contact}
          </Route>
          <Route exact path="/login">
            {Login}
          </Route>
          <Route exact path="/register">
            {Register}
          </Route>
          <Route>{/* Componente para la página de error 404 */}</Route>
        </Switch>
      </Router>
      {/* <h2>Body</h2> */}

      {/* footer */}
      <Footer />
    </>
  );
}

export default App;
