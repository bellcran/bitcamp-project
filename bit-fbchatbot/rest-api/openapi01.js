const request = require('request');
const searchNewAddress = (SearchWord) => {
  request({
    url : 'http://openapi.epost.go.kr/postal/retrieveNewAdressAreaCdService/retrieveNewAdressAreaCdService/getNewAddressListAreaCd' + 
          '?' + encodeURIComponent('ServiceKey') + '=RVa4aHtfnNZMBYNcpc6X3J%2Flo%2BN2hTfBIKxViV7JEOdmgNQXdVuBoLWGcC%2BywH67XDYAA%2BbS3cOLEPr9tSDgtw%3D%3D' + 
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