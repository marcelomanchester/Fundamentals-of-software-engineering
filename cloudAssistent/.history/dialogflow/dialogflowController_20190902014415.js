const Kubernetes = require("../kubernetes/kubernetes");
const telegram = require("../telegram/manageBot");

async function detectKubeAcctions(result){
    if (result.intent.displayName == 'Deploy de Aplicação'){
        const version = result.parameters.fields.Version.stringValue;
        const deployName = result.parameters.fields.Name.stringValue;
        const images = result.parameters.fields.Images.stringValue;
        const response = await Kubernetes.createDeploy(deployName, images, version);
    }
}

function sendTelegramMessage(message, id){
    telegram.sendMessage(message, id);
}

module.exports = {
    detectKubeAcctions
}