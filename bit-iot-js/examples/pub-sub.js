// AWS IoT의 gateway에 메시지를 보내는 예제
// 메시지를 보내는 것을 "발행(publish)"이라고 표현한다.
var awsIot = require('aws-iot-device-sdk');

var device = awsIot.device({
   keyPath: 'dev01.private.key',
  certPath: 'dev01.cert.pem',
    caPath: 'root-CA.crt',
  clientId: 'client1',
      host: 'aez0ui7qkmx0b.iot.ap-northeast-2.amazonaws.com'
});

device
  .on('connect', function() {
    console.log('connect');
    device.subscribe('topic_1');
    console.log("사서함 구독 시작")
    //device.publish('topic_2', JSON.stringify({ test_data: 1}));
  });

device
  .on('message', function(topic, payload) {
    console.log("======> 사서함 메시지 도착")
    console.log("사서함 이름: ", topic)
    console.log('받은 메시지', payload.toString());
  });
