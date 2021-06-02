import React from "react";
import "./Foodlist.css";

//img의 alt와 title은 사진에 마우스 올렸을 때 나오는 제목 표시하기 위함
//css를 하기 위해서 style={{}}를 사용할 수 있다.
class Foodlist extends React.Component {
  constructor(props) {
    super(props);
  }

  clickEventHandler = (e) => {
    e.preventDefault();
    console.log("The button was clicked.");
  };

  render() {
    const { foodname } = this.props;
    return (
      <div className="foodList">
        <span className="foodName">{foodname}</span>
      </div>
    );
  }
}

export default Foodlist;
