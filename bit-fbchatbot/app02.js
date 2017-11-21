const https = require("https")
const express = require("express")
const fs = require("fs")
const bodyParser = require('body-parser');

const request = require('request');

var jsonParser = bodyParser.json()
var urlPaarser = bodyParser.urlencoded({extended: true})


// .env 파일의 내용을 로딩한다.
const dotenv = require("dotenv").config()

const app = express()
app.use(jsonParser)
app.use(urlPaarser)

// 인증서 데이터를 로딩한다.
var options = {
	key: fs.readFileSync("custom.key"),
	cert: fs.readFileSync("www_kjhak_xyz.crt"),
	ca: fs.readFileSync("www_kjhak_xyz.ca-bundle")
}

app.use(express.static('public'))

app.get("/hello", function(request, response) { 
	response.writeHead(200, { "Content-Type" : "text/plain;charset=utf8"})
	response.write("Hello! 안녕하세요.\n")
	response.end()	
})

// 페이스북 서버에서 이 서버의 유효성을 검사하기 위해 요청한다.
// => 테스트 : https://www.kjhak.xyz:9999/webhook?hub.mode=subscribe&hub.verify_token=abcd1234&hub.challenge=ok
app.get('/webhook', function(req, res) {
  if (req.query['hub.mode'] === 'subscribe' &&
      req.query['hub.verify_token'] === process.env.VERIFY_TOKEN) {
    console.log("Validating webhook");
    res.status(200).send(req.query['hub.challenge']);
  } else {
    console.error("Failed validation. Make sure the validation tokens match.");
    res.sendStatus(403);          
  }
});


// 메시지 처리
// 1) 사용자가 페이스북 페이지에 메시지를 보낸다
// 2) 페이지스북 메신저 서버가 이 서버의 '/webhook' URL로 포스트 요청한다.
// 3) 이 서버는 이 포스트 요청을 처리한 후 응답한다.
// 4) 페이스북 메신저 서버가 사용자에게 메시지를 보낸다.
// 5) 사용자 메신저에 응답 내용이 출력된다.
app.post('/webhook', function (req, res) {
  console.log(req.body);
  var data = req.body; // 페이스북 메신저 서버에서 보낸 데이터

  // 우리가 만든 페이스북 페이지로 보낸 메시지인지 검사한다.
  if (data.object === 'page') {

	// 여러 사용자가 메세지를 동시에 보낼 때  
	// 페이스북 메신저 서버는 통신 효율을 위해
	// 그 사용자들의 메세지를 묶어서 한 번에 보내준다.
	// 그 경우 data.entry에는 여러 사용자들의 메시지들이 배열로 들어 있다.
    data.entry.forEach(function(entry) {
      // 각가의 보따리(엔트리)에 들어있는 메시지를 처리한다.
	  var pageID = entry.id;
      var timeOfEvent = entry.time;

	  // 각 보따리에 메시지가 여러개 일 수 있기 때문에
	  // 배열로 처리한다.
      entry.messaging.forEach(function(event) {
		if (event.message) {
          var senderID = event.sender.id;
		  var recipientID = event.recipient.id;
		  var timeOfMessage = event.timestamp;
		  var message = event.message;
		  var messageText = message.text;

		  console.log(senderID)
		  console.log(recipientID)
		  console.log(messageText)

		  // 이제 답변 데이터를 준비한다.
		  var messageData = {
			recipient: {
				id: recipientId // 내 아이디
			},
			message: {
				text: "hello...."
			}
		  };


		  request({
			uri: 'https://graph.facebook.com/v2.6/me/messages',
			qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
			method: 'POST',
			json: messageData
	
		  }, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				var recipientId = body.recipient_id;
				var messageId = body.message_id;
	
				console.log("Successfully sent generic message with id %s to recipient %s", 
					messageId, recipientId);
			} else {
				console.error("Unable to send message.");
				console.error(response);
				console.error(error);
			}
		  });  

        } else { // 그 밖에는 그냥 콘솔창에 출력한다.
          console.log("Webhook received unknown event: ", event);
        }
	  })
	})
  }
})


// https 실행하는 방법
https.createServer(options, app).listen(9999, function() {
	console.log("서버가 시작되었습니다.")
})

/*
// http 실행하는 방법
app.listen(9999, function() {
	console.log("서버가 시작되었습니다.")
})
*/

// ftp 로 해당소스를  아마존 서버에 올려서 테스트한다.
// 웹브라우저에서 테스트한다.
// => https://www.kjhak.com
// => https://www.kjhak.com:9999
// => https://www.kjhak.com:9999/hello

