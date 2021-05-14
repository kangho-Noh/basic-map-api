// 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
var mapContainer = document.getElementById("map"),
  mapOption = {
    center: new kakao.maps.LatLng(37.566826, 126.9786567),
    level: 3,
  };
if (navigator.geolocation) {
  console.log("geolocation 성공");
  // GeoLocation을 이용해서 접속 위치를 얻어옵니다
  navigator.geolocation.getCurrentPosition(function (position) {
    (lat = position.coords.latitude), // 위도
      (lon = position.coords.longitude); // 경도
    //message = '<div style="padding:5px;">여기에 계신가요?!</div>'; // 인포윈도우에 표시될 내용입니다
    mapOption = {
      center: new kakao.maps.LatLng(lat, lon),
      level: 3,
    };
    // 마커와 인포윈도우를 표시합니다
    //displayMarker(locPosition, message);
    makemap();
  });
} else {
  // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
  console.log("geolocation을 사용할 수 없습니다.");
  /*var locPosition = new kakao.maps.LatLng(33.450701, 126.570667),
      message = "geolocation을 사용할수 없어요..";
      mapOption = {
        center: locPosition,
        level: 3
    };*/
  //displayMarker(locPosition, message);
  makemap();
}
/*var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = {
        center: locPosition, // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    }; */

function makemap() {
  // 지도를 생성합니다
  map = new kakao.maps.Map(mapContainer, mapOption);

  // 장소 검색 객체를 생성합니다
  var ps = new kakao.maps.services.Places();

  // 키워드로 장소를 검색합니다
  ps.keywordSearch("닭갈비", placesSearchCB, {
    radius: 1000,
    location: new kakao.maps.LatLng(lat, lon),
  });
  ps.keywordSearch("칼국수", placesSearchCB, {
    radius: 1000,
    location: new kakao.maps.LatLng(lat, lon),
  });
}

// 키워드 검색 완료 시 호출되는 콜백함수 입니다
function placesSearchCB(data, status, pagination) {
  if (status === kakao.maps.services.Status.OK) {
    console.log(data);
    // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
    // LatLngBounds 객체에 좌표를 추가합니다
    var bounds = new kakao.maps.LatLngBounds();

    for (var i = 0; i < data.length; i++) {
      displayMarker(data[i]);
      bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
    }

    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    map.setBounds(bounds);
  }
}

// 지도에 마커를 표시하는 함수입니다
function displayMarker(place) {
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
}
