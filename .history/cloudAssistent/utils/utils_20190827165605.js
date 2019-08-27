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
module.exports = {
    createRequestWithAuthorization,
}
