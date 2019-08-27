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
        const response = await Kubernetes.createDeploy(texts[1], texts[2], texts[3]);
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


module.exports = {
    getUpdates
}