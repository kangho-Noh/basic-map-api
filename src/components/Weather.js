import React from "react";
import "./Weather.css";

class Weather extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { season } = this.props;
    const { weatherStatement } = this.props;
    return (
      <div className="js-input">
        <span id="weather">{weatherStatement}</span>
        <span id="day">{season}엔,</span>
      </div>
    );
  }
}

export default Weather;
