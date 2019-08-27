const https = require('https');

function createRequestWithAuthorization(host, api, port, method, auth = false) {
    var request = {
        "host": host,
        "path": api,
        "port": port,
        "method": method,
        "headers": {
            "X-CSRF-Token": "cDJnrIwuz1VIeq1_cBLmJf1bBBo:1516058286181",
            "Authorization": auth

        }
    };

    return request
}


function httpsRequest(https_options, body = '') {
    return new Promise(function(resolve, reject) {
      const request = https.request(https_options, function(response) {
        let data = '';
  
        response.on('data', function(cbresponse) {
          data += cbresponse;
        });
  
        response.on('end', () => {
          try {
            const response = JSON.parse(data);
            resolve(response);
          } catch (err) {
            console.log('ERR ====>  ', err);
            reject(err);
          }
        });
      });
  
      if (body instanceof Object) {
        body = JSON.stringify(body);
      }
  
  
      request.write(body);
      request.end();
    });
}
module.exports = {
    createRequestWithAuthorization,
}
