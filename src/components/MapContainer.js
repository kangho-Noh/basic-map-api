/*global kakao*/
import React, { Component, useCallback } from "react";
import styled from "styled-components";

const { kakao } = window;

var map;
var nowlat, nowlon;
var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      lat: 37.506502,
      lon: 127.053617,
    };

    this.getLocation = this.getLocation.bind(this);
    this.getMap = this.getMap.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  getLocation = (callback) => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(function (position) {
        nowlat = position.coords.latitude; // 위도
        nowlon = position.coords.longitude; // 경도
        console.log(nowlat, nowlon);
        var locPosition = new kakao.maps.LatLng(nowlat, nowlon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
        //message = '<div style="padding:5px;">여기에 계신가요?!</div>'; // 인포윈도우에 표시될 내용입니다

        // 마커와 인포윈도우를 표시합니다
        //displayMarker(locPosition, message);
        callback();
        //return locPosition;
      });
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때, 사용자가 위치정보 거부했을 땐
      nowlat = 37.506502; // 위도
      nowlon = 127.053617; // 경도커 표시 위치와 인포윈도우 내용을 설정합니다

      var locPosition = new kakao.maps.LatLng(37.506502, 127.053617);
      //message = "geolocation을 사용할수 없어요..";

      //displayMarker(locPosition, message);
      callback();
    }
  };
  getMap = () => {
    this.getLocation(() => {
      this.setState({ lat: nowlat, lon: nowlon });
      let container = document.getElementById("Mymap");
      let options = {
        center: new kakao.maps.LatLng(this.state.lat, this.state.lon),
        level: 7,
      };

      map = new window.kakao.maps.Map(container, options);

      // 장소 검색 객체를 생성합니다
      //console.log(kakao.maps);
      var ps = new kakao.maps.services.Places();

      // 키워드로 장소를 검색합니다
      ps.keywordSearch("닭갈비", this.placesSearchCB, {
        radius: 1000,
        location: new kakao.maps.LatLng(nowlat, nowlon),
      });
      ps.keywordSearch("칼국수", this.placesSearchCB, {
        radius: 1000,
        location: new kakao.maps.LatLng(nowlat, nowlon),
      });
    });
  };
  // 키워드 검색 완료 시 호출되는 콜백함수 입니다
  placesSearchCB = (data, status, pagination) => {
    if (status === kakao.maps.services.Status.OK) {
      //console.log(data);
      // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
      // LatLngBounds 객체에 좌표를 추가합니다
      var bounds = new kakao.maps.LatLngBounds();

      for (var i = 0; i < data.length; i++) {
        this.displayMarker(data[i]);
        bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
      }

      // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
      map.setBounds(bounds);
    }
  };

  // 지도에 마커를 표시하는 함수입니다
  displayMarker = (place) => {
    // 마커를 생성하고 지도에 표시합니다
    var marker = new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(place.y, place.x),
    });

    // 마커에 클릭이벤트를 등록합니다
    kakao.maps.event.addListener(marker, "click", function () {
      // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
      infowindow.setContent(
        `<div style="padding:5px;font-size:12px;"><a href="${place.place_url}" target="_blank">${place.place_name}</a></div>`
      );
      infowindow.open(map, marker);
    });
  };

  componentDidMount() {
    this.getMap();
  }

  render() {
    return <MapContents id="Mymap"></MapContents>; // 이부분이 지도를 띄우게 될 부분.
  }
}

const MapContents = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
`;

export default MapContainer;
