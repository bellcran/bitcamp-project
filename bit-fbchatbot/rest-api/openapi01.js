const request = require('request');
const searchNewAddress = (SearchWord) => {
  request({
    url : 'http://openapi.epost.go.kr/postal/retrieveNewAdressAreaCdService/retrieveNewAdressAreaCdService/getNewAddressListAreaCd' + 
          '?' + encodeURIComponent('ServiceKey') + '오픈API키값' + 
          '&' + encodeURIComponent('searchSe') + '=' + encodeURIComponent('dong') + 
          '&' + encodeURIComponent('srchwrd') + '=' + encodeURIComponent(SearchWord) +
          '&' + encodeURIComponent('countPerPage') + '=' + encodeURIComponent('10') + 
          '&' + encodeURIComponent('currentPage') + '=' + encodeURIComponent('1'),    
    method: 'GET'
  }, function (error, response, body) {
    console.log('====> Status', response.statusCode);
    console.log('====> Headers', JSON.stringify(response.headers));
    console.log('====> Reponse received', body);
  });  
} 
//searchNewAddress('길음동 1284')
module.exports = {
  searchNewAddress
}