const { useCallback } = require('react');
var request = require('request');

const weather = (_weather, callback) => {
    let _lat = _weather.lat;
    let _lon = _weather.lon;
    let _calcDate = calcDate();
    var url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService/getVilageFcst';
    var queryParams = '?' + encodeURIComponent('ServiceKey') + process.env.WEATHER_KEY; /* Service Key*/
    queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /* */
    queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON'); /* */
    queryParams += '&' + encodeURIComponent('base_date') + '=' + encodeURIComponent(_calcDate.yeardate); /* */
    queryParams += '&' + encodeURIComponent('base_time') + '=' + encodeURIComponent(_calcDate.time); /* */
    queryParams += '&' + encodeURIComponent('nx') + '=' + encodeURIComponent(Math.round(_lat)); /* */
    queryParams += '&' + encodeURIComponent('ny') + '=' + encodeURIComponent(Math.round(_lon)); /* */
    console.log("weather.js의 ", _lat, ", ", _lon);
    console.log("접속하는 weather JSON은 ", url+queryParams);
    console.log("날씨 API에 request를 보내고 응답을 기다리는 중입니다...");
    request({
        url: url + queryParams,
        method: 'GET'
    }, function (error, response, body) {
        //console.log('Status', response.statusCode);
        //console.log('Headers', JSON.stringify(response.headers));
        // console.log('Reponse received -->', body);
        console.log("응답이 완료됐습니다.");
        var bodyObj = JSON.parse(body);
        console.log("--> 날씨는", bodyObj.response.body.items.item[1].fcstValue, "입니다.");
        // 강수형태(PTY) 코드 : 없음(0), 비(1), 비/눈(2), 눈(3), 소나기(4), 빗방울(5), 빗방울/눈날림(6), 눈날림(7)
        callback(undefined, {
            weather: bodyObj.response.body.items.item[1].fcstValue
        })
    });
}
function calcDate() {
    var today = new Date();
    var week = new Array('일', '월', '화', '수', '목', '금', '토');
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
        hours = ((parseInt((hours + 1) / 3)) - 1) * 3 + 2;
        if (hours < 0) {
            // 자정 이전은 전날로 계산
            today.setDate(today.getDate() - 1);
            day = today.getDate();
            month = today.getMonth() + 1;
            year = today.getFullYear();
            hours = 23;
        }
    }
    else {
        hours = ((parseInt((hours + 1) / 3)) - 1) * 3 + 2;
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
        hours = '0' + hours;
    }
    if (month < 10) {
        month = '0' + month;
    }
    if (day < 10) {
        day = '0' + day;
    }
    let yeardate = year + month + day;
    let time = hours + '00';
    return { yeardate: yeardate, time: time }
}

module.exports = weather;