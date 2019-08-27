const Utils = require("../utils/utils");
const Config = require("./telegramConfig");


async function getUpdates(last_chat_id){
    const https_options = Utils.createRequestWithAuthorization(Config.TELEGRAM_IP, "/bot" + Config.TELEGRAM_APITOKEN, Config.TELEGRAM_PORT,"GET");
    const response = await Utils.httpsRequest(https_options);
    console.log(response);
}

module.exports = {
    getUpdates
}