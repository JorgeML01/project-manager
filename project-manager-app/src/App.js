// import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavigationBar from "./pages/NavigationBar/NavigationBar";
import Footer from "./pages/Footer/Footer";
import Slider from "./components/Slider";

const Home = () => {
  return (
    <>
      {/* <h1 id="title">Project Manager</h1> */}
      <Slider />
    </>
  );
};

//! Ésto se pondría nada más si estuviéramos haciendo el Home en un archivo aparte.
//export default Home;

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
