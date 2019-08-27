const Utils = require("../utils/utils");
const Config = require("./telegramConfig");
const Kubernetes = require("../kubernetes/kubernetes");

async function getUpdates(chat_id, chat_text){
    const https_options = Utils.createRequestWithAuthorization(Config.TELEGRAM_IP, "/bot" + Config.TELEGRAM_APITOKEN + "/getUpdates", Config.TELEGRAM_PORT,"GET");
    const response = await Utils.httpsRequest(https_options);
    const lastChat = getLastChat(response.result);
    if (chat_id != lastChat.id || chat_text != lastChat.text ){
        checkCommand(lastChat.text);
    }
}

async function checkCommand(command){
    const texts = command.split(" ")
    console.log(command.split(" "))
    if (texts[0] == "/createDeployment"){
        const response = await Kubernetes.createDeploy(command[1], command[2], command[3]);
        console.log(response)
    } 
}

function getLastChat(result){
    const index = Math.ceil(result.length - 1);
    console.log("index ==" , index)
    const id = result[index]["message"]["chat"]["id"];
    const text = result[index]["message"]["text"];
    return {id: id, text: text};
}

// router.post('/teste', async (req, res) => {
//     const keys = {
//       'type': 'service_account',
//       'project_id': 'level-oxygen-251114',
//       'private_key_id': '36563fbd018550f1d4350db92af90e9574df2387',
//       'private_key': '-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQC7CWcfMPfx1OXc\nP30bzPEl7jNU3PHMSGj3ujI524H5+ce13ssGEzEh5NQ4w/Rr2ynlE8KjmrpPWwvT\nIH7IRtF56mGjmfVkyMbpPAxXResltg7d7qZ8bps9eLTUHZbbw2AE6C/7yGA83tfj\nLChb/dpIe2Un4eFLoOhAYZZTJ3YuFhn31+E6js6YgasI19FxrEqgcTQ8xXVb19lF\nhbvzWhSO6hW0ojAAqf5KewXJ1Fsj728UbX6nZAlphRktSrx/7y59E9HhnNfTclCT\n1NPsHVnRvFpTVBF5QjVnG7q4fg5zkFFc4v+EgUzN/FD12ZoEq6xoUzGwXLiJxgNN\ntx8gifPNAgMBAAECggEAVSbxwPydVYdU4xIwllCW1Wr+CbvRhezNhUNLDJZINZOn\nfcCh8/EW5FR23iUwiU4tY7K8YZnXCrvrxUI9FldPlU7FByPX2fuiu5rwD2ewp+mc\nGSRGvc3pdXIX+Z5DCWiItZM0DVBrqCrYZP+8nC0VjPxI0ICA/tqSAoWrV85WeqIi\nKP394ZYR6Fzeq+4zPoBkyr5iE0Dahu99axBfArchWccBXd45jZ4KpwmZJM/QhSZX\nOjEPZV/1WlQ+aCLzKk2aDMq2ZgJX2RjBPFhLC1k/rlUip7OxRw+LATYfd62D2c9R\nwvmK0dmC8ntbc70v1B0NJJLMRekYi5/1X8iEfHYIrQKBgQD7NB8ySGq6c0PIGzJL\nE6Vqih22G8IyXVBdB5MVsFTvEaI/+fu4IZf0BwJMxzPXkukrBntKwn90MyC/wbfq\nMbIeLC51jIP9uUQoB0KiJc1vjg7PvYp8As439hwlfopPoQ8lXBGf4nH43dwvVlzN\nzw3o1HrgUEL+4vvfjHh1KVU1zwKBgQC+m6J0LUQLGTbthIav4TERq2jtTXC6AjFW\n7n2gemk7IyvAX+u41N9UjFAuTaIfxf1dfU2FzZzJxVH9j1uBBFmY/cIc03TLwurC\nkSO//YwhAg9cibQxtt1D9BuFoTZFEerjnsWsGlBJ1uXZKhu4ITkGSjQq5ZWOQ931\nmNElqbl/owKBgQDtdlgHMG2z00I/53Wjgu7bx7ROce8hrRRK3N4tooKnfAPkdmt9\npEQAap/B9I0NO9Mu2PGzuijBr5NFsdopiNDXtOw2Mp6TOo8zR6m1ngaVbbSSrJo8\noGpQfFYfG3+jxpyKtH30phsXJqL+HKWd6B09+54sbbLnP6rZp/A20Nu8AQKBgQCk\nQr9nWzMOVXZujgz8ORbuYUeVaW1B/23ButlsmNFi81Za/M7JhDnKRPk8Tg7vTtKf\n5MIQEzeQ8olL+GUk9Di6jcTgzqISjzF851Nluv0t3PacCtfNGAfq7c1iBaIdN+my\nqzsyq6KRX67IzW8B6S+Zag03Ao82AOqhIkbrLC79/QKBgQCk1B0BDWk1tXuyLYug\njcCgw3TUGsz6DoAI2A5b0vk3ddanbOajw47N7iuw8yYQ5g968cbhet61MtG6ym5p\nTVqJX8ThJm6XH0cYDwTmHWnf3yCkBHEkHN3TlLMmgaE6rAD9WnyBN5s0eibYBE5B\noarYYXkPJPG3EZfegVCIt+Ga5g==\n-----END PRIVATE KEY-----\n',
//       'client_email': 'admink8s@level-oxygen-251114.iam.gserviceaccount.com',
//       'client_id': '113527181135802168367',
//       'auth_uri': 'https://accounts.google.com/o/oauth2/auth',
//       'token_uri': 'https://oauth2.googleapis.com/token',
//       'auth_provider_x509_cert_url': 'https://www.googleapis.com/oauth2/v1/certs',
//       'client_x509_cert_url': 'https://www.googleapis.com/robot/v1/metadata/x509/admink8s%40level-oxygen-251114.iam.gserviceaccount.com',
//     };
//     const projectID = keys['project_id'];
  
  
//     const https_options = {
//       'host': '35.247.221.76',
//       'path': `/api/v1/namespaces/default/secrets/sysadmin-token-hmrwd`,
//       'method': 'GET',
//       'headers': await requestAuthJwt(keys, `https://container.googleapis.com/v1/projects/${projectID}/locations/southamerica-east1/clusters/projeto/get-credentials`),
  
//     };
  
//     // const json = {
//     //   'apiVersion': 'v1',
//     //   'kind': 'ServiceAccount',
//     //   'metadata': {
//     //     'name': 'sysadmin',
//     //     'namespace': 'default',
//     //   },
//     // };
  
//     const json = {
//       'apiVersion': 'rbac.authorization.k8s.io/v1beta1',
//       'kind': 'ClusterRoleBinding',
//       'metadata': {
//         'name': `sysadmin-role-binding`,
//       },
//       'roleRef': {
//         'apiGroup': 'rbac.authorization.k8s.io',
//         'kind': 'ClusterRole',
//         'name': 'cluster-admin',
//       },
//       'subjects': [
//         {
//           'kind': 'ServiceAccount',
//           'name': 'sysadmin',
//           'namespace': 'default',
//         },
//       ],
//     };
  
//     const response1 = await httpsRequest(https_options);
//     console.log(response1);
//     res.json(response1);
//   });

module.exports = {
    getUpdates
}