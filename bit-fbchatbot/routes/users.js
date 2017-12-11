// node.js 에서 Express 모듈을 사용할 경우
// 다음과 같이 express 라우터 객체에 클라이언트 요청을 처리할 함수를 등록한다.
// 만약 Express 모듈을 사용하지 않는다면 다음 코드는 무의미하다.
//import express from 'express'
const express = require("express")
// 클라이언트 요청이 들어왔을 때 함수를 호출해 주는 객체
const router = express.Router();
// 요청 URL에 응답할 함수를 라우터 객체에 등록
router.post('/login',  function(req, res) {
	console.log("POST DATA LINK USER", req.body);
	get_user_account(req.body.number, function(error, result){
		var location = redirect_uri+
						'?account_linking_token='+ account_linking_token +
						'&authorization_code='+req.body.number;
		console.log(location);
		console.log(req.body);
		console.log("successfully linked user");
	});
})
function get_user_account(number, callback){
	console.log('checking get user account number ');
	test_nuban = 0225303680;
	test_account_id = 2148166591;
	
	callback(null, JSON.stringify({
		nuban: test_nuban,
		account_id: test_account_id
	}));
}
module.exports = router