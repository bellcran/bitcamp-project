const request = require('request');
const searchNewAddress = (SearchWord) => {
  request({
    uri: 'http://openapi.epost.go.kr/postal/retrieveNewAdressAreaCdService/retrieveNewAdressAreaCdService/getNewAddressListAreaCd',
    qs: { 
      /* Service Key*/
      ServiceKey : 'RVa4aHtfnNZMBYNcpc6X3J%2Flo%2BN2hTfBIKxViV7JEOdmgNQXdVuBoLWGcC%2BywH67XDYAA%2BbS3cOLEPr9tSDgtw%3D%3D',
      /* dong : 동(읍/면)명 road :도로명[default] post : 우편번호 */
      searchSe:  'dong',
      /* 검색어 */
      srchwrd : encodeURIComponent(SearchWord),
      /* 페이지당 출력될 개수를 지정 */
      countPerPage : '10',
      /* 출력될 페이지 번호 */
      currentPage : '1'
    },
    method: 'GET'
  }, function (error, response, body) {
    console.log('====> Status', response.statusCode);
    console.log('====> Headers', JSON.stringify(response.headers));
    console.log('====> Reponse received', body);
  });  
}

searchNewAddress('길음동 1284')

//http://openapi.epost.go.kr/postal/retrieveNewAdressAreaCdService/retrieveNewAdressAreaCdService/getNewAddressListAreaCd?ServiceKey=RVa4aHtfnNZMBYNcpc6X3J%2Flo%2BN2hTfBIKxViV7JEOdmgNQXdVuBoLWGcC%2BywH67XDYAA%2BbS3cOLEPr9tSDgtw%3D%3D&searchSe=dong&srchwrd=주월동 408-1&countPerPage=10¤tPage=1

/*
module.exports = {
  searchNewAddress
}
*/