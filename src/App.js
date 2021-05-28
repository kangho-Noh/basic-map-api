import React, { Component } from "react";
import { BrowserRouter, HashRouter, Route } from "react-router-dom";
import "./App.css";
import Home from "./routes/Home";

function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact={true} component={Home} />
    </BrowserRouter>
  );
}
export default App;
