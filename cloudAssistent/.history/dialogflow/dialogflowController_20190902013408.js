const Kubernetes = require("../kubernetes/kubernetes");

function detectKubeAcctions(result){
    if (result.intent.displayName == 'Deploy de Aplicação'){
        const version = result.parameters.fields.Version.stringValue;
        const deployName = result.parameters.fields.Name.stringValue;
        const images = result.parameters.fields.Images.stringValue;
        Kubernetes.createDeploy(deployName, images, version);
    }
}

module.exports = {
    detectKubeAcctions
}