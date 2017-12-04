const request = require('request');
const parseString = require('xml2js').parseString;
//require('dotenv').config({ path: '/home/ec2-user/vars/.env' }) //로컬 테스트용
const searchNewAddress = (type, searchWord, callback) => { // callback: 작업을 끝낸 다음에 호출해야 하는 함수
//const searchNewAddress = (type, searchWord) => { // 로컬 테스트용
  var uri = 'http://openapi.epost.go.kr/postal/retrieveNewAdressAreaCdService/retrieveNewAdressAreaCdService/getNewAddressListAreaCd';
  /* Service Key*/
  var queryString = '?ServiceKey=' + process.env.OPENAPI_KEY;
  //var queryString = '?ServiceKey=' + '오픈API 키값';// 로컬 테스트용

  /* dong : 동(읍/면)명 road :도로명[default] post : 우편번호 */
  queryString += '&searchSe=' + type;

  /* 검색어 */
  queryString += '&srchwrd=' + encodeURIComponent(searchWord); 

  /* 페이지당 출력될 개수를 지정 */
  queryString += '&countPerPage=10';

  /* 출력될 페이지 번호 */
  queryString += '&currentPage=1'; 

  request({
    uri: uri + queryString,
    method: 'GET'
  }, function (error, response, body) {
    console.log('====> Status', response.statusCode);
    console.log('====> Headers', JSON.stringify(response.headers));
    console.log('====> Reponse received', body);

    parseString(body, (err, result) => {
      var headers = result.NewAddressListResponse.cmmMsgHeader[0];
      var totalCount = headers.totalCount[0];
      var countPerPage = headers.countPerPage[0];
      var currentPage = headers.currentPage[0];
      
      console.log(["주소 검색 결과"])
      console.log(totalCount);
      console.log(countPerPage);
      console.log(currentPage);
      console.log('------------------------------');
  
      var message = '';
      var addrList = result.NewAddressListResponse.newAddressListAreaCd;

      if(addrList === undefined || addrList === null){
        message = "검색결과가 없습니다."
      } else {
        for (var addr of addrList) {
            message += '[' + addr.zipNo[0] + ']\n'
            message += addr.rnAdres[0] + '\n';
            message += addr.lnmAdres[0] + '\n';
            message += '\n';
        }
      }
      callback(message)
      //callback(message) // 로컬 테스트용; 막고 테스트한다.
    });
  });  
}
//searchNewAddress('dong', '길음동 1284')
//searchNewAddress('road', '충장로123번길 26');
//searchNewAddress('dong', '행신동 1002');
//searchNewAddress('post', '17512');

module.exports = {
  searchNewAddress
}