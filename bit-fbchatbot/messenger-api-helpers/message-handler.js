// 메신저 서버에게 메시지를 전달해 주는 도구 가져오기
const api = require("./api")
// message 를 받았을 때 그 메시지를 처리할 함수를 보관하는 객체
const messageHandler = {
  // "메시지": 함수
}
// message 를 처리할 함수를 등록한다.
const addMessage = (message, handler) => {
  messageHandler[message] = handler
}
// 등록된 메시지 핸들러를 찾아서 리턴한다.
const getHandler = (message) => {
  return messageHandler[message];
}
// "help" 메시지를 처리할 함수 등록
addMessage("help", (recipientId) => {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      "attachment":{
        "type":"template",
        "payload":{
          "template_type":"button",
          "text":"메뉴",
          "buttons":[
            {
              "type":"postback",
              "title":"LED",
              "payload":"/led" // 버튼 클릭 시, 서버에 다시 보내지는 값; postback-handler 에 구현
            },
            {
              "type":"postback",
              "title":"계산기",
              "payload":"/calc"
            },
            {
              "type":"postback",
              "title":"주소검색",
              "payload":"/addr"
            }
          ]
        }
      }
    }
  };
  api.callMessagesAPI(messageData);
})
module.exports = {
  getHandler
}