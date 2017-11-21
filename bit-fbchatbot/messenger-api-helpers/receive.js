
const request = require('request');
const sendAPI = require("./send")
const handleReceiveMessage = (event) => {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfMessage = event.timestamp;
  var message = event.message;

  console.log("Received message for user %d and page %d at %d with message:", 
    senderID, recipientID, timeOfMessage);
  //console.log(JSON.stringify(message)); // 로그 출력 정리

  var messageId = message.mid;
  var messageText = message.text; 
  var messageAttachments = message.attachments; // 사진, 음성 첨부

  if (messageText == 'led') {
    sendAPI.sendLedMessage(senderID)
  } else {
    sendAPI.sendTextMessage(senderID, messageText)
  }
}

const handleReceivePostback = (event) => {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfPostback = event.timestamp;
  var payload = event.postback.payload;

  console.log("Received postback for user %d and page %d with payload '%s' " + 
  "at %d", senderID, recipientID, payload, timeOfPostback);

  if (payload == "led_on") {
    sendAPI.sendTextMessage(senderID, "전구를 켜겠습니다.");
    request({
      uri: 'http://www.kjhak.xyz:8080/chatbot/json/led/on',
      qs: { "senderID": senderID },
      method: 'POST'
    }, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log("SpringBoot 응답 ====>", body)
        var obj = JSON.parse(body)
        var senderID = obj.data.senderID;
        if (obj.state == "success") {
          sendAPI.sendTextMessage(senderID, "전구-" + obj.data.state);
        } else {
          sendAPI.sendTextMessage(senderID, "전구 제어 실패");
        }
      } else {
        console.log("SpringBoot 요청 오류", body)
        sendAPI.sendTextMessage(senderID, "전구 제어 실패");
      }
    })
  } else if (payload == "led_off") {
    sendAPI.sendTextMessage(senderID, "전구를 끄겠습니다.");
  } else {
    sendAPI.sendTextMessage(senderID, "실행할 수 없는 명령입니다.");
  }
}

module.exports = {
  handleReceiveMessage,
  handleReceivePostback
}