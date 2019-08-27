const Utils = require("../utils/utils");
const Config = require("./telegramConfig");
const Kubernetes = require("../kubernetes/kubernetes");

async function getUpdates(chat_id, chat_text){
    const https_options = Utils.createRequestWithAuthorization(Config.TELEGRAM_IP, "/bot" + Config.TELEGRAM_APITOKEN + "/getUpdates", Config.TELEGRAM_PORT,"GET");
    const response = await Utils.httpsRequest(https_options);
    const lastChat = getLastChat(response.result);
    if (chat_id != lastChat.id || chat_text != lastChat.text ){
        checkCommand(lastChat.text, lastChat.id);
    }
    setTimeout(() => {
       getUpdates(lastChat.id, lastChat.text);     
    }, 300);
}

async function sendMessage(id, text){
    const https_options = Utils.createRequestWithAuthorization(Config.TELEGRAM_IP, "/bot" + Config.TELEGRAM_APITOKEN + `/sendMessage?text=${text}&chat_id=${id}`, Config.TELEGRAM_PORT,"GET");
    const response = await Utils.httpsRequest(https_options);
}

async function checkCommand(command, id){
    var texts = command.split(" ");
    texts = texts.filter((word)=> word !== "");
    if (texts[0] == "/createDeployment"){
        console.log(texts)
        const response = await Kubernetes.createDeploy(texts[1], texts[2], texts[3]);
        console.log(response)
    }else if (texts[0] == "/listDeployments"){
        const response = await Kubernetes.listDeploy();
        sendMessage(id, "Deployments:") 
        response.map(async (deploy, index) => await sendMessage(id ,`${index}-${deploy.metadata.name}`));
    } 
}

function getLastChat(result){
    const index = Math.ceil(result.length - 1); 
    const id = result[index]["message"]["chat"]["id"];
    const text = result[index]["message"]["text"];
    return {id: id, text: text};
}


module.exports = {
    getUpdates
}