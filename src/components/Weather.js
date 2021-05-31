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
    return <div></div>;
  }
}

export default Weather;
