import React from "react";
import "./Sidebar.css";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { sidebarInfo } = this.props;
    return (
      <div className="sidebar__data">
        <h3 className="sidebar__data sidebar__title">
          {sidebarInfo.place_name}
        </h3>
        <h5 className="sidebar__data sidebar__address">
          {sidebarInfo.address}
        </h5>
        <h5 className="sidebar__data sidebar__distance">
          현재 위치로부터 {sidebarInfo.distance}m
        </h5>
        <h5 className="sidebar__data sidebar__phone">
          전화번호 : {sidebarInfo.phone}
        </h5>
        <a
          className="sidebar__data sidebar__url"
          href={sidebarInfo.place_url}
          target="_blank"
        >
          자세히
        </a>
      </div>
    );
  }
}

export default Sidebar;
