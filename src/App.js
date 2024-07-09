import React from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Pages from "./pages/Pages";
import "./App.css";
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/pages"></Redirect>
        </Route>
        <Route path="/homw" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/pages/:pageNumber">
          <Pages />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
