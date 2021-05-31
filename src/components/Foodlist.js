import React from "react";
import PropTypes from "prop-types";
import "./Foodlist.css";

//img의 alt와 title은 사진에 마우스 올렸을 때 나오는 제목 표시하기 위함
//css를 하기 위해서 style={{}}를 사용할 수 있다.
function Foodlist({ id, name }) {
  function clickEventHandler(e) {
    e.preventDefault();
    console.log("The button was clicked.");
  }

  return (
    <button className="toggle-button" onClick={clickEventHandler}>
      {name}
    </button>
  );
}

Foodlist.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

export default Foodlist;
