import React from "react";
import { Link } from "react-router-dom";
import "./Main.css";
import 'semantic-ui-css/semantic.min.css';
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
      <div class="container">
        <div class="title_container">
          <p class="title">오늘 뭐 먹지?</p>
        </div>
        <div class="search_container">
          <div class="search_input ui input">
            <input style={{width:200, height:40}}             
              placeholder="예) 영통동, 강남역"
              type="text"
              onChange={this.handleChange}
            />
          </div>
          <Link
            to={{
              pathname: `/search/${placename}`,
              state: { placename },
            }}
          >
            <button style={{width: 130, height:40}} class="search_button ui inverted orange button">장소로 검색하기</button>
          </Link>
        </div>

        <div class="nowloc_container">
          <Link to="search">
            <button style={{width: 340, height:40}} class="nowloc_button ui orange button">현재 위치로 검색하기</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Main;
