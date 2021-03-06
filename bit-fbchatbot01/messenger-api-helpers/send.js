// 메신저 서버에게 메시지를 전달해 주는 도구 가져오기
const api = require("./api")
//////////////////////////
// Sending helpers
//////////////////////////
const sendTextMessage = (recipientId, messageText) => {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: messageText
    }
  };
  api.callMessagesAPI(messageData);
};

const sendImageMessage = (recipientId) => {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      "attachment":{
        "type":"image", 
        "payload":{
          "url":"http://www.sportsq.co.kr/news/photo/201708/249003_237707_652.jpg", 
          "is_reusable":true
        }
      }
    }
  };
  api.callMessagesAPI(messageData);
};

const sendButton1Message = (recipientId) => {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      "attachment":{
        "type":"template",
        "payload":{
          "template_type":"button",
          "text":"검색 사이트를 선택하세요!",
          "buttons":[
            {
              "type":"web_url",
              "url":"https://www.google.com",
              "title":"구글"
            },
            {
              "type":"web_url",
              "url":"https://www.daum.net",
              "title":"다음"
            },
            { 
              "type":"web_url",
              "url":"https://www.naver.com",
              "title":"네이버"
            }
          ]
        }
      }
    }
  };
  api.callMessagesAPI(messageData);
};

const sendButton2Message = (recipientId) => {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      "attachment":{
        "type":"template",
        "payload":{
          "template_type":"button",
          "text":"전화번호를 선택하세요!",
          "buttons":[
            {
              "type":"phone_number",
              "title":"내 스마트폰",
              "payload":"+821099595461"
            },
            {
              "type":"phone_number",
              "title":"집전화",
              "payload":"+8229425461"
            }
          ]
        }
      }
    }
  };
  api.callMessagesAPI(messageData);
};

const sendGenericMessage = (recipientId) => {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [{
            title: "rift",
            subtitle: "Next-generation virtual reality",
            item_url: "https://www.oculus.com/en-us/rift/",               
            image_url: "http://messengerdemo.parseapp.com/img/rift.png",
            buttons: [{
              type: "web_url",
              url: "https://www.oculus.com/en-us/rift/",
              title: "Open Web URL"
            }, {
              type: "postback",
              title: "Call Postback",
              payload: "Payload for first bubble",
            }],
          }, {
            title: "touch",
            subtitle: "Your Hands, Now in VR",
            item_url: "https://www.oculus.com/en-us/touch/",               
            image_url: "http://messengerdemo.parseapp.com/img/touch.png",
            buttons: [{
              type: "web_url",
              url: "https://www.oculus.com/en-us/touch/",
              title: "Open Web URL"
            }, {
              type: "postback",
              title: "Call Postback",
              payload: "Payload for second bubble",
            }]
          }]
        }
      }
    }
  };  
  api.callMessagesAPI(messageData);
};
module.exports = {
  sendTextMessage
  //sendImageMessage,
  //sendButton1Message,
  //sendButton2Message,
  //sendGenericMessage
};