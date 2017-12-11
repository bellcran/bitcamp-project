// node.js 에서 Express 모듈을 사용할 경우
// 다음과 같이 express 라우터 객체에 클라이언트 요청을 처리할 함수를 등록한다.
// 만약 Express 모듈을 사용하지 않는다면 다음 코드는 무의미하다.
//import express from 'express'
const express = require("express")
// 클라이언트 요청이 들어왔을 때 함수를 호출해 주는 객체
const router = express.Router();
// 요청 URL에 응답할 함수를 라우터 객체에 등록
router.get('/', (request, response) => { // narrow 문법; function 대신 화살표 사용
  response.writeHead(200, {
      'Content-Type': 'text/plain;charset=UTF-8'
  })
  response.write('Hello, 안녕하세요!\n')
  response.end()
})
//export default router
module.exports = router