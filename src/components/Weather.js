import React from "react";
import "./Weather.css";

var nowlat = 37.506502,
  nowlon = 127.053617;

class Weather extends React.Component {
  state = {
    day: "월요일",
    weather: "비",
  };

  weather = () => {
    var xhr = new XMLHttpRequest();
    var serviceKey =
      "kr%2FQXx6vPof0PDy8c%2BYL6vB2U7M7rv%2ByDaBzN%2FJ1orHghEJnhIds2hOmt59WFhziYr0vvgFzsKAg1UlTpPLuQw%3D%3D";
    let _calcDate = this.calcDate();
    console.log(_calcDate.yeardate);
    console.log(_calcDate.time);
    //  http://cors-anywhere.herokuapp.com/corsdemo 에서 demo 서버 열어야 한다.
    var url =
      "https://cors-anywhere.herokuapp.com/http://apis.data.go.kr/1360000/VilageFcstInfoService/getVilageFcst"; //동네예보
    var queryParams = "?" + encodeURIComponent("ServiceKey") + "=" + serviceKey;
    queryParams +=
      "&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent("1"); /* */
    queryParams +=
      "&" +
      encodeURIComponent("numOfRows") +
      "=" +
      encodeURIComponent("10"); /* */
    queryParams +=
      "&" +
      encodeURIComponent("dataType") +
      "=" +
      encodeURIComponent("JSON"); /* */
    queryParams +=
      "&" +
      encodeURIComponent("base_date") +
      "=" +
      encodeURIComponent(_calcDate.yeardate); /* */
    queryParams +=
      "&" +
      encodeURIComponent("base_time") +
      "=" +
      encodeURIComponent(_calcDate.time); /* */
    queryParams +=
      "&" + encodeURIComponent("nx") + "=" + encodeURIComponent(56); /* */
    queryParams +=
      "&" + encodeURIComponent("ny") + "=" + encodeURIComponent(131); /* */
    xhr.open("GET", url + queryParams); // 요것때매 CORS 오류 발생
    xhr.onreadystatechange = function () {
      if (this.readyState == 4) {
        const body = JSON.parse(this.responseText);
        console.log(body.response.body.items);
        console.log(
          "--> 날씨는",
          body.response.body.items.item[1].fcstValue,
          "입니다."
        );
        // 강수형태(PTY) 코드 : 없음(0), 비(1), 비/눈(2), 눈(3), 소나기(4), 빗방울(5), 빗방울/눈날림(6), 눈날림(7)
        // 여기서 비/눈은 비와 눈이 섞여 오는 것을 의미 (진눈개비)
      }
    };
    xhr.send("");
  };
  calcDate = () => {
    var today = new Date();
    var week = new Array("일", "월", "화", "수", "목", "금", "토");
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var day = today.getDate();
    var hours = today.getHours();
    var minutes = today.getMinutes();
    /*
     * 기상청 30분마다 발표
     * 30분보다 작으면, 한시간 전 hours 값
     */
    if (minutes < 30) {
      hours = hours - 1;
      hours = (parseInt((hours + 1) / 3) - 1) * 3 + 2;
      if (hours < 0) {
        // 자정 이전은 전날로 계산
        today.setDate(today.getDate() - 1);
        day = today.getDate();
        month = today.getMonth() + 1;
        year = today.getFullYear();
        hours = 23;
      }
    } else {
      hours = (parseInt((hours + 1) / 3) - 1) * 3 + 2;
      if (hours < 0) {
        // 자정 이전은 전날로 계산
        today.setDate(today.getDate() - 1);
        day = today.getDate();
        month = today.getMonth() + 1;
        year = today.getFullYear();
        hours = 23;
      }
    }
    /* example
     * 9시 -> 09시 변경 필요
     */
    if (hours < 10) {
      hours = "0" + hours;
    }
    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }
    let yeardate = year + month + day;
    let time = hours + "00";
    return { yeardate: yeardate, time: time };
  };

  getLocation = (callback) => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(function (position) {
        nowlat = position.coords.latitude; // 위도
        nowlon = position.coords.longitude; // 경도
        console.log(nowlat, nowlon);
      });
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때, 사용자가 위치정보 거부했을 땐
      nowlat = 37.506502; // 위도
      nowlon = 127.053617; // 경도커 표시
    }
    callback();
  };

  componentDidMount() {
    this.getLocation(this.weather);
  }
  render() {
    return <div></div>;
  }
}

export default Weather;
