const Utils = require("../utils/utils");
const Config = require("./telegramConfig");
const Kubernetes = require("../kubernetes/kubernetes");
const querystring = require('querystring');

async function getUpdates(chat_id, chat_text){
    const https_options = Utils.createRequestWithAuthorization(Config.TELEGRAM_IP, "/bot" + Config.TELEGRAM_APITOKEN + "/getUpdates", Config.TELEGRAM_PORT,"GET");
    const response = await Utils.httpsRequest(https_options);
    const lastChat = getLastChat(response.result);
    if (chat_id != lastChat.id || chat_text != lastChat.text ){
        sendCommand(lastChat.text, lastChat.id);
    }
    setTimeout(() => {
       getUpdates(lastChat.id, lastChat.text);     
    }, 300);
}

async function sendMessage(id, text){
    const https_options = Utils.createRequestWithAuthorization(Config.TELEGRAM_IP, "/bot" + Config.TELEGRAM_APITOKEN + `/sendMessage?text=${text}&chat_id=${id}`, Config.TELEGRAM_PORT,"GET");
    return await Utils.httpsRequest(https_options);
}

async function sendCommand(command, id){
    
{

function getLastChat(result){
    const index = Math.ceil(result.length - 1); 
    const id = result[index]["message"]["chat"]["id"];
    const text = result[index]["message"]["text"];
    return {id: id, text: text};
}


module.exports = {
    getUpdates,
    sendMessage
}