import React from "react";
import "./FoodButtons.css";
// import 'semantic-ui-css/semantic.min.css';
//img의 alt와 title은 사진에 마우스 올렸을 때 나오는 제목 표시하기 위함
//css를 하기 위해서 style={{}}를 사용할 수 있다.
class FoodButtons extends React.Component {
  constructor(props) {
    super(props);
  }

  setButtonColor() {
    const { buttonIndex } = this.props;
    if (buttonIndex.length) {
      console.log(buttonIndex);
      for (let i = 0; i < buttonIndex.length; i++) {
        let btn = document.getElementById(buttonIndex[i]);
        btn.classList.add(`button_${i}`);
      }
    }
  }

  render() {
    this.setButtonColor();
    const { foodname, buttonClickEventHandler } = this.props;

    return (
      <div className="button-div">
        <button
          id={foodname}
          className="toggle-button"
          onClick={buttonClickEventHandler}
        >
          {foodname}
        </button>
      </div>
    );
  }
}

export default FoodButtons;
