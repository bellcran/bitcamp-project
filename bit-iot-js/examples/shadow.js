// AWS IoT의 Thing Shadow 에 값을 설정하고 꺼내는 방법
// AWS에서 제공하는 nodeJS 모듈을 로딩한다.
var awsIot = require('aws-iot-device-sdk');
// 새도우에 등록할 장비명
const thingName = "dev01"
// AWS IoT 서버에 등록된 Thing 정보를 바탕으로 장비를 준비시킨다.
var thingShadows = awsIot.thingShadow({
   keyPath: 'dev01.private.key',
  certPath: 'dev01.cert.pem',
    caPath: 'root-CA.crt',
  clientId: 'client2',
      host: 'aez0ui7qkmx0b.iot.ap-northeast-2.amazonaws.com'
});
// Thing의 섀도우 제어 장비가 준비되었을 때 호출될 함수 등록
thingShadows.on('connect', function() {
  console.log('새도우 관리자가 준비되었다.')
  // 지정한 Thing 에 shadow 연결을 요청한다. => Shadow 연결에 성공한다면 설정된 함수가 호출될 것이다.
  thingShadows.register( thingName, {}, function() {
    console.log('새도우에 연결하였다.')
    // 장비가 준비되면 일단 섀도우 설정된 값을 가져온다.
    console.log('새도우에 설정된 값 조회를 요청한다.')
    thingShadows.get(thingName)
  });
});
// Thing의 Shadow 에 명령을 지시하고 그 명령을 수행한 후에 호출될 함수 등록
thingShadows.on('status', function(thingName, stat, clientToken, stateObject) {
  if (stat === 'rejected' && stateObject.code === 404) {
    // shadow 에 값이 없다면 기본값을 설정한다.
    console.log('섀도우에 값이 없어서 기본 값을 설정하였음!');
    thingShadows.update('dev01', {
      state: {
        desired : {
          led: "off"
        }
      }
    });
  } else {
    console.log('received(status) '+stat+' on '+thingName+': '+JSON.stringify(stateObject));
  }
});
// Shadow 의 상태가 변경되었을 때 부가적으로 이벤트가 발생하는데 그 때 호출될 함수 등록
thingShadows.on('delta', function(thingName, stateObject) {
   console.log('received delta on '+thingName+': '+JSON.stringify(stateObject));
});
// 지정된 타임아웃 시간이 경과했을 때 호출될 함수 등록
thingShadows.on('timeout', function(thingName, clientToken) {
   console.log('received timeout on '+thingName+' with token: '+ clientToken);
});