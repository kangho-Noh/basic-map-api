import React from "react";
import "./Weather.css";

class Weather extends React.Component {
  state = {
    day: "월요일",
    weather: "비",
  };

  componentDidMount() {
    //this.getLocation(this.weather);
  }
  render() {
    return (
      <div>
        <h1>오늘은</h1>
        <div className="js-input">
          <span id="weather">비가 오는</span> <span id="day">일요일</span>
        </div>
        <h1 className="align-right">이네요.</h1>
      </div>
    );
  }
}

export default Weather;
