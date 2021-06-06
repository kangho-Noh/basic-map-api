import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
  return (
    <div className="nav">
      <Link to="/">처음 화면으로</Link>
      <Link to="/Search">내 위치로 검색</Link>
    </div>
  );
}

export default Navigation;
