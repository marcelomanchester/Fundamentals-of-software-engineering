const Utils = require("../utils/utils");
const Config = require("./telegramConfig");
const Kubernetes = require("../kubernetes/kubernetes");
const querystring = require('querystring');

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
    return await Utils.httpsRequest(https_options);
}

async function checkCommand(command, id){
    var texts = command.split(" ");
    texts = texts.filter((word)=> word !== "");
    if (texts[0] == "/createDeployment"){
        const response = await Kubernetes.createDeploy(texts[1], texts[2], texts[3]);
        if(response.status == 'Failure'){
            sendMessage(id, encodeURIComponent("Erro ao criar aplicação"));
        }
    }else if (texts[0] == "/listDeployments"){
        const response = await Kubernetes.listDeploy();
    //    console.log(response[0].spec.template.spec.containers[0].image) 
        response.map(async (deploy) => await sendMessage(id ,encodeURIComponent(`Nome: ${deploy.metadata.name} Imagem: ${deploy.spec.template.spec.containers[0].image.split(":")[0]} Versão: ${deploy.spec.template.spec.containers[0].image.split(":")[1]}`)));
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