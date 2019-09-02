// const express = require('express');
// const router = express.Router();
const Config = require("./kubernetesConfig");
const Utils = require("../utils/utils");
const Model = require("./models/deploy");

async function createDeploy(name, image, version, port = 80){
    var https_options = Utils.createRequestWithAuthorization(Config.CLUSTER_IP, "/apis/extensions/v1beta1/namespaces/default/deployments",Config.CLUSTER_PORT, "POST", Config.CLUSTER_TOKEN);
    var body = Model.createDeploymentBody(name, image, version, port);
    var response = await Utils.httpsRequest(https_options, body);
    console.log(response)
    return response
}

async function listDeploy(){
    var https_options = Utils.createRequestWithAuthorization(Config.CLUSTER_IP, "/apis/extensions/v1beta1/namespaces/default/deployments", Config.CLUSTER_PORT, "GET", Config.CLUSTER_TOKEN);
    var response = await Utils.httpsRequest(https_options);
    return response.items;
}

async function deleteDeploy(name){
    var https_options = Utils.createRequestWithAuthorization(Config.CLUSTER_IP, `/apis/apps/v1/namespaces/default/deployments/${name}`, Config.CLUSTER_PORT, "DELETE", Config.CLUSTER_TOKEN);
    var response = await Utils.httpsRequest(https_options);
    return response;
}

async function updateDeploy(name, image, version){
    var https_options = Utils.createRequestWithAuthorization(Config.CLUSTER_IP, `/apis/apps/v1beta2/namespaces/default/deployments/${name}`, Config.CLUSTER_PORT, "PATCH", Config.CLUSTER_TOKEN);
    var body = Model.updateVersionBody(name, image, version);
    var response = await Utils.httpsRequest(https_options, body);
    return response
}

module.exports = {
    createDeploy,
    listDeploy,
    deleteDeploy,
    updateDeploy
}