var express = require("express")
var app = express()

app.use(express.static('public'))

app.get("/hello", function(request, response) { 
	response.writeHead(200, { "Content-Type" : "text/plain;charset=utf8"})
	response.write("Hello! 안녕하세요.\n")
	response.end()	
})

app.listen(9999, function() {
	console.log("서버가 시작되었습니다.")
})

// ftp 로 아마존 서버에 소스를 올려서 테스트한다.
// 웹브라우저에서 테스트한다.
// => http://www.kjhak.com