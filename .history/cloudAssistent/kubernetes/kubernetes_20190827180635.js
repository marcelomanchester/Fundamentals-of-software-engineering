const express = require('express');
const router = express.Router();
const Config = require("./kubernetesConfig");
const Utils = require("../utils/utils");

async function createDeploy(name, image, version, port = 80){
    
}


module.exports = {
    router
}