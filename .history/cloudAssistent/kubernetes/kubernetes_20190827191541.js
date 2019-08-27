// const express = require('express');
// const router = express.Router();
const Config = require("./kubernetesConfig");
const Utils = require("../utils/utils");
const Model = require("./models/deploy");

async function createDeploy(name, image, version, port = 80){
    var https_options = Utils.createRequestWithAuthorization(Config.CLUSTER_IP, "/apis/extensions/v1beta1/namespaces/default/deployments",Config.CLUSTER_PORT, "POST", Config.CLUSTER_TOKEN);
    var body = Model.createDeploymentBody(name, image, version, port);
    var response = await Utils.httpsRequest(https_options, body);
    return response
}

async function listDeploy(){
    var https_options = Utils.createRequestWithAuthorization(Config.CLUSTER_IP, "/apis/extensions/v1beta1/namespaces/default/deployments", Config.CLUSTER_PORT, "GET", Config.CLUSTER_TOKEN);
    var response = await Utils.httpsRequest(https_options);
    var menssages = response.items.map((deploy, index) => `${index} - ${deploy.metadata.name}`);
    return menssages;
}


module.exports = {
    createDeploy,
    listDeploy
}