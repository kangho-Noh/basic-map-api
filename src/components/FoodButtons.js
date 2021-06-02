import React from "react";
import "./FoodButtons.css";

//img의 alt와 title은 사진에 마우스 올렸을 때 나오는 제목 표시하기 위함
//css를 하기 위해서 style={{}}를 사용할 수 있다.
class FoodButtons extends React.Component {
  constructor(props) {
    super(props);
  }

  

  render() {
    const { foodname, buttonClickEventHandler } = this.props;
    return (
      <div className="button-div">
        <button id={foodname} className="toggle-button" onClick={buttonClickEventHandler}>
          {foodname}
        </button>
      </div>
    );
  }
}

export default FoodButtons;
