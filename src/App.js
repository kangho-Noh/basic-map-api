import React from "react";
import { BrowserRouter, HashRouter, Route } from "react-router-dom";
import "./App.css";
import Search from "./routes/Search";
import Main from "./routes/Main";
import Navigation from "./components/Navigation";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Route path="/" exact={true} component={Main} />
      <Route path="/search" exact={true} component={Search} />
      <Route path="/search/:placename" exact={true} component={Search} />
    </BrowserRouter>
  );
}
export default App;
