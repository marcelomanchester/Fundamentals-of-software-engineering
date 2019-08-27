const express = require('express');
const router = express.Router();
const Config = require("./kubernetesConfig");
const Utils = require("../utils/utils");
const Model = require("./models/deploy");

async function createDeploy(name, image, version, port = 80){
    var https_options = Utils.createRequestWithAuthorization(Config.CLUSTER_IP, "",Config.CLUSTER_PORT, "POST", Config.CLUSTER_TOKEN);

}


module.exports = {
    router
}