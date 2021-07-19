import * as React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Button } from "antd";

import "./App.css";
import { About } from "./components/About/About";
import { Home } from "./components/Home/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <Link to="/home">
          <Button type="link">Home</Button>
        </Link>
        &nbsp; &nbsp;
        <Link to="/about">
          {" "}
          <Button type="link">About</Button>
        </Link>
        <Route path="/about" component={About} />
        <Route path="/home" component={Home} />
      </Router>
    </div>
  );
}

export default App;
