<<<<<<< HEAD
// 메신저 서버에게 메시지를 전달해 주는 도구 가져오기
const api = require("./api")
const sendAPI = require('./send');
const openAPI = require('../rest-api/openapi');
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
// 현재 계산기 메뉴일 때, 사용자가 입력한 값을 처리하는 함수 등록 
addMessage('/calc', (recipientId, messageText) => {
  // 계산식을 분석한다.
  try {
      var tokens = messageText.split(' ');
      if (tokens.length != 3)
          throw '계산 형식 오류';

      var a = parseInt(tokens[0]);
      var op = tokens[1];
      var b = parseInt(tokens[2]);
      var result = 0;
      switch (op) {
      case '+': result = a + b; break;
      case '-': result = a - b; break;
      case '*': result = a * b; break;
      case '/': result = a / b; break;
      case '%': result = a % b; break;
      default:
          sendAPI.sendTextMessage(recipientId, 
              '+, -, *, /, % 연산자만 사용할 수 있습니다.')
          return;
      }
      sendAPI.sendTextMessage(recipientId, 
          '계산 결과는 ' + result + ' 입니다.')
  } catch (exception) {
      sendAPI.sendTextMessage(recipientId, 
          '계산식이 옳지 않습니다.\n예)값1 연산자 값2')
  }
});
// 현재 주소검색 메뉴일 때, 사용자가 선택한 검색항목(동)을 처리하는 함수 등록 
addMessage('/addr/dong', (recipientId, messageText) => {
  try {
      openAPI.searchNewAddress('dong', messageText, (msg) => {
          sendAPI.sendTextMessage(recipientId, msg);
      });
  } catch (err) {
      console.log(err);
  }
});
// 현재 주소검색 메뉴일 때, 사용자가 선택한 검색항목(도로명)을 처리하는 함수 등록 
addMessage('/addr/road', (recipientId, messageText) => {
  try {
      openAPI.searchNewAddress('road', messageText, (msg) => {
          sendAPI.sendTextMessage(recipientId, msg);
      });
  } catch (err) {
      console.log(err);
  }
});
// 현재 주소검색 메뉴일 때, 사용자가 선택한 검색항목(우편번호)을 처리하는 함수 등록 
addMessage('/addr/post', (recipientId, messageText) => {
  try {
      openAPI.searchNewAddress('post', messageText, (msg) => {
          sendAPI.sendTextMessage(recipientId, msg);
      });
  } catch (err) {
      console.log(err);
  }
});
const request = require('request');
const UserStore = require("../stores/user_store")
addMessage('user profile', (recipientId, messageText) => {
  const userProfile = UserStore.getByMessengerId(recipientId);
  request({
    uri: "https://graph.facebook.com/v2.6/" + userProfile.messengerId + "?fields=first_name,last_name,profile_pic&access_token=" + process.env.PAGE_ACCESS_TOKEN ,
    method: 'GET'
  }, function (error, response, body) {
    console.log('====> Status', response.statusCode);
    console.log('====> Headers', JSON.stringify(response.headers));
    console.log('====> Reponse received', body);
    sendAPI.sendTextMessage(recipientId, body);
  });
});
const isEmpty = require("lodash/isEmpty")
addMessage('GET_STARTED', (recipientId) => {
  const userProfile = UserStore.getByMessengerId(recipientId);
  if (!isEmpty(userProfile)) {
    sendAPI.sendLoggedInWelcomeMessage(recipientId, userProfile.username);
  } else {
    sendAPI.sendLoggedOutWelcomeMessage(recipientId);
  }
})
module.exports = {
  getHandler
=======
// 메신저 서버에게 메시지를 전달해 주는 도구 가져오기
const api = require("./api")
const sendAPI = require('./send');
const openAPI = require('../rest-api/openapi');
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
// 현재 계산기 메뉴일 때, 사용자가 입력한 값을 처리하는 함수 등록 
addMessage('/calc', (recipientId, messageText) => {
  // 계산식을 분석한다.
  try {
      var tokens = messageText.split(' ');
      if (tokens.length != 3)
          throw '계산 형식 오류';

      var a = parseInt(tokens[0]);
      var op = tokens[1];
      var b = parseInt(tokens[2]);
      var result = 0;
      switch (op) {
      case '+': result = a + b; break;
      case '-': result = a - b; break;
      case '*': result = a * b; break;
      case '/': result = a / b; break;
      case '%': result = a % b; break;
      default:
          sendAPI.sendTextMessage(recipientId, 
              '+, -, *, /, % 연산자만 사용할 수 있습니다.')
          return;
      }
      sendAPI.sendTextMessage(recipientId, 
          '계산 결과는 ' + result + ' 입니다.')
  } catch (exception) {
      sendAPI.sendTextMessage(recipientId, 
          '계산식이 옳지 않습니다.\n예)값1 연산자 값2')
  }
});
// 현재 주소검색 메뉴일 때, 사용자가 선택한 검색항목(동)을 처리하는 함수 등록 
addMessage('/addr/dong', (recipientId, messageText) => {
  try {
      openAPI.searchNewAddress('dong', messageText, (msg) => {
          sendAPI.sendTextMessage(recipientId, msg);
      });
  } catch (err) {
      console.log(err);
  }
});
// 현재 주소검색 메뉴일 때, 사용자가 선택한 검색항목(도로명)을 처리하는 함수 등록 
addMessage('/addr/road', (recipientId, messageText) => {
  try {
      openAPI.searchNewAddress('road', messageText, (msg) => {
          sendAPI.sendTextMessage(recipientId, msg);
      });
  } catch (err) {
      console.log(err);
  }
});
// 현재 주소검색 메뉴일 때, 사용자가 선택한 검색항목(우편번호)을 처리하는 함수 등록 
addMessage('/addr/post', (recipientId, messageText) => {
  try {
      openAPI.searchNewAddress('post', messageText, (msg) => {
          sendAPI.sendTextMessage(recipientId, msg);
      });
  } catch (err) {
      console.log(err);
  }
});
const request = require('request');
const UserStore = require("../stores/user_store")
addMessage('user profile', (recipientId, messageText) => {
  const userProfile = UserStore.getByMessengerId(recipientId);
  request({
    uri: "https://graph.facebook.com/v2.6/" + userProfile.messengerId + "?fields=first_name,last_name,profile_pic&access_token=" + process.env.PAGE_ACCESS_TOKEN ,
    method: 'GET'
  }, function (error, response, body) {
    console.log('====> Status', response.statusCode);
    console.log('====> Headers', JSON.stringify(response.headers));
    console.log('====> Reponse received', body);
    sendAPI.sendTextMessage(recipientId, body);
  });
});
const isEmpty = require("lodash/isEmpty")
addMessage('GET_STARTED', (recipientId) => {
  const userProfile = UserStore.getByMessengerId(recipientId);
  if (!isEmpty(userProfile)) {
    sendAPI.sendLoggedInWelcomeMessage(recipientId, userProfile.username);
  } else {
    sendAPI.sendLoggedOutWelcomeMessage(recipientId);
  }
})
module.exports = {
  getHandler
>>>>>>> 9ff316e634b09e44acd0cb3c32cdf5ef1ddeb728
}