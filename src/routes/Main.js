import React from "react";
import { Link } from "react-router-dom";
import "./Main.css";

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      placename: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange = (e) => {
    this.setState({placename: e.target.value})
  };

  render() {
    const { placename } = this.state;
    return (
      <div>
        <h1>오늘 뭐 먹지?</h1>
        <div className="button1">
          <input
            placeholder="예) 영통동, 강남역"
            type="text"
            onChange={this.handleChange}
          />
          <Link
            to={{
              pathname: `/search/${placename}`,
              state: { placename },
            }}
          >
            <button>장소로 검색하기</button>
          </Link>
        </div>

        <div className="button2">
          <Link to="search">
            <button>현재 위치로 검색하기</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Main;
