// 메신저 서버에게 메시지를 전달해 주는 도구 가져오기
const api = require("./api")
const sendAPI = require("./send")
// postback 을 받았을 때 그 postback 을 처리할 함수를 보관하는 객체
const postbackHandler = {}

// postback 을 처리할 함수를 등록한다.
const addPostback = (postback, handler) => {
    postbackHandler[postback] = handler
}
// 등록된 메시지 핸들러를 찾아서 리턴한다.
const getHandler = (postback) => {
  return postbackHandler[postback];
}
addPostback("/led", (recipientId) => {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      "attachment":{
        "type":"template",
        "payload":{
          "template_type":"button",
          "text":"LED 스위치",
          "buttons":[
            {
              "type":"postback",
              "title":"LED On",
              "payload":"/led/on"
            },
            {
              "type":"postback",
              "title":"LED Off",
              "payload":"/led/off"
            }
          ]
        }
      }
    }
  };
  api.callMessagesAPI(messageData);
})
addPostback("/led/on", (recipientId) => {
  sendAPI.sendTextMessage(recipientId, 'LED를 켭니다.')
  // SpringBoot 와 연결한다;
})
addPostback("/led/off", (recipientId) => {
  sendAPI.sendTextMessage(recipientId, 'LED를 끕니다.')
  // SpringBoot 와 연결한다;
})
addPostback("/addr", (recipientId) => {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      "attachment":{
        "type":"template",
        "payload":{
          "template_type":"button",
          "text":"검색 항목",
          "buttons":[
            {
              "type":"postback",
              "title":"동이름",
              "payload":"/addr/dong"
            },
            {
              "type":"postback",
              "title":"도로명",
              "payload":"/addr/road"
            },
            {
              "type":"postback",
              "title":"우편번호",
              "payload":"/addr/post"
            }
          ]
        }
      }
    }
  };
  api.callMessagesAPI(messageData);
})
addPostback("/addr/dong", (recipientId) => {
  sendAPI.sendTextMessage(recipientId, '동 이름?');
})
addPostback("/addr/road", (recipientId) => {
  sendAPI.sendTextMessage(recipientId, '도로명?');
})
addPostback("/addr/post", (recipientId) => {
  sendAPI.sendTextMessage(recipientId, '우편번호?');
})
module.exports = {
  getHandler
}