import React, { useEffect } from "react";
import MapContainer from "../components/MapContainer";
import Weather from "../components/Weather";
import "./Home.css";

const Home = () => {
  return (
    <div>
      <header>
        <div>
          <Weather />
          <h1>오늘은</h1>
          <div className="js-input">
            <span id="weather">비가 오는</span> <span id="day">일요일</span>
          </div>
          <h1 className="align-right">이네요.</h1>
        </div>
      </header>
      <div className="map-container">
        <div className="main">
          <div className="contents">
            <div className="food-list">
              <ul>
                {/*<Foodlist />*/}
                <li>닭갈비</li>
                <li>칼국수</li>
              </ul>
            </div>
            <div className="map_wrap">
              <MapContainer />
            </div>
          </div>
          <div className="sidebar">사이드바 영역입니다.</div>
        </div>
      </div>
      <div className="footer">푸터 영역입니다.</div>
    </div>
  );
};

export default Home;
