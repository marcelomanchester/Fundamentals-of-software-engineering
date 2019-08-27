const Utils = require("../utils/utils");
const Config = require("./telegramConfig");


async function getUpdates(last_chat_id, last_chat_text){
    const https_options = Utils.createRequestWithAuthorization(Config.TELEGRAM_IP, "/bot" + Config.TELEGRAM_APITOKEN + "/getUpdates", Config.TELEGRAM_PORT,"GET");
    const response = await Utils.httpsRequest(https_options);
}

function getLastChat(result){
    const index = result.length - 1;
    const id = result['result'][index]["message"]["chat"]["id"];
    const text = result['result'][index]["message"]["text"]
}


module.exports = {
    getUpdates
}