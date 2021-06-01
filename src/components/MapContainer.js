import React, { Component } from "react";
import styled from "styled-components";

class MapContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const props = this.props;
    //console.log("props", props);
    return <MapContents id="Mymap"></MapContents>;
  }
}

const MapContents = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
`;

export default MapContainer;
