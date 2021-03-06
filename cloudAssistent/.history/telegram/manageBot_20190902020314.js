const Utils = require("../utils/utils");
const Config = require("./telegramConfig");
// const Kubernetes = require("../kubernetes/kubernetes");
const querystring = require('querystring');
// const dialogflow = require("../dialogflow/dialogflow");

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

async function sendMessage(text, id){
    console.log("SEND ---> ", id, text)
    text = querystring.escape(text);
    const https_options = Utils.createRequestWithAuthorization(Config.TELEGRAM_IP, "/bot" + Config.TELEGRAM_APITOKEN + `/sendMessage?text=${text}&chat_id=${id}`, Config.TELEGRAM_PORT,"GET");
    response = await Utils.httpsRequest(https_options);
    console.log(response)
}

async function sendCommand(command, id){
    console.log(command, id)
    talkToDialogflow(command, id);
}

function getLastChat(result){
    const index = Math.ceil(result.length - 1); 
    const id = result[index]["message"]["chat"]["id"];
    const text = result[index]["message"]["text"];
    return {id: id, text: text};
}


const dialogflow = require('dialogflow');
const uuid = require('uuid');
// const controller = require('../dialogflowController');


async function talkToDialogflow(message, currentChatId) {
    // A unique identifier for the given session
    const projectId = 'level-oxygen-251114';
    const sessionId = uuid.v4();
    const json = {
        "type": "service_account",
        "project_id": "level-oxygen-251114",
        "private_key_id": "115690cbfd8d721369bfd663eac86cd1e5707815",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDaaMWsABKLQtzz\n/7isZvdNQY8i9fiSkQNrKRPG0xFAO8UB0YaW4cEdSRFUUt1D9dyLF8XLJfEmX+OT\nHSDjGSww9xbdC3jNvnbuQypIOVKmdFIYqmwjbJgxdhqevZjS40mAqwkdpbbOyuyQ\nbqLgV7IIgPU9Ex1pLu8AbnNHNi8yQlTrSwC6zMhBWwNzYthVeM62DZSEnXo7e7nR\nEhW3lerblTYGfIGcs2+wQmLCOBNM5z71rG0u+GEMSdqqGV17vKzKfQrh4Vhc26uD\naj2ZUec/vc0r6hPjah2F+RAsTFcbnjrcZgpKnFJ2m8PUAV7UArpNGRGjSaHBQ5fC\nI7zUkVJlAgMBAAECggEAL9FlieFgLf4/Guq/d3t5pH/4gyqAODKooXMWYd7/NWWA\nngPOKEWX/r3rHd+gkwsGtKtJQk91yzWOQTzM4Pu3aacHafDji4QqTMMGxFZMiqYH\n/V9+mojhj16wuFWBWpaplpKbxdJswjy6a2rVnTGGCIeXab5AH7HHYPxNn+c0kRd+\nKpKYEZLzcpx5GlBoHDtJ96sxQUhOmWO//PEOXnd9Ai1uL+woWx1Mt1BS3m6IqwLD\ndzGxxGg+GNb/iEnzNbLpZizUu1zoY2tjx8crxqXK4eegwHQfxu9eWL9fVIwzpxkq\nBiJfQj0ajBwzzwNUkwvxWu/oBftfZkv2XpTkklaaNwKBgQDwo96K6jv8Z3UK9p8N\n6ioEeBu2a9iwaNnNT+mMjtNvZb4ttXi+x0YBPO2WQT91YgwFbhKIiqp8KuGjlZyC\nPmRri8G72LDJV1WxOQxNlFFMjMKGToJFYOK9cWQ11V5Fg5XwDle975pTCzJvS4z4\nwBIh+ETFRBCqpXLcQDYoFUkcHwKBgQDoWaTq2j6L01WDLsdwzq2kKOyvmh59MtZI\nO86rzFoMBxksdQxtV0RPQuraLMBuku8pwiwWeLeUIMUQpy56dI2pcoD8ersly4Pw\nsFCL55tskzt1iXjSzLq35031PLhYGTVwKzVor5sr6+3Jn56XsEkL5LnXB6PY732L\nB/njlcVA+wKBgDvVEtVJbkbQ1no2Xc/Q5EeeMY3G/ObH+zegYfqP3KR7ELE+yNnu\npEpUguJ0MLoX+dMzzinjCIa9BsNsxLBhoQhYhIAXXcWCEI1zGMsFUL2O1iMczClB\n8L6XvgngloMEN7iraEeSlrWFODIR/+gtoZSOrVK7HMXBQ3DeClknCbmTAoGACvvB\n2gA7GK0Cy9K4RtLeTnZIyfxFGLIAgyWgnWppj0v+mqVl0v1fE0gchfe7mP6FI7o0\nD1PhibUK28CrZ8p+r9Xj1wuOMTkvoX8UL6jhJf7HvsSi24QmB299tewK4s8+QXEp\ncytp8GeUtAVBn/YLXe6QAmQwEJ8xlhLocyOvUWUCgYA8yC8hTA4GF9FtYcXtQB3+\nNAvsQL0Xl3i7SC5nn5KZ+feeZLKBoguI/jAdy+YmpvlwRYbTcwqjSCx2JW0QOsJ0\nzR5CmY7SXhUv4QfFQTN3km91+PSqbQuMQCpVzD6f6Om/By6fa8q0JfJx1ff9iAkC\nAEKWm7kKa81BHADQrbKnlQ==\n-----END PRIVATE KEY-----\n",
        "client_email": "dialogflow-nodejs@level-oxygen-251114.iam.gserviceaccount.com",
        "client_id": "101734873060943062813",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/dialogflow-nodejs%40level-oxygen-251114.iam.gserviceaccount.com"
    }

    // Create a new session
    const sessionClient = new dialogflow.SessionsClient({
        credentials: json
    });

    sessionClient.auth.jsonContent = json;
    sessionClient.auth.checkIsGCE = false;
    const sessionPath = sessionClient.sessionPath(projectId, sessionId);

    // The text query request.
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                // The query to send to the dialogflow agent
                text: message,
                // The language used by the client (en-US)
                languageCode: 'pt-BR',
            },
        },
    };

    // Send request and log result
    const responses = await sessionClient.detectIntent(request);
    // console.log('Detected intent');
    const result = responses[0].queryResult;
    console.log(result.parameters.fields)
    // console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);
    if (result.intent) {
        // console.log(`  Intent: ${result.intent.displayName}`);
        detectKubeAcctions(result, currentChatId);
    } else {
        console.log(`  No intent matched.`);
    }
}

async function detectKubeAcctions(result, currentChatId){
    console.log("aqui")
    if (result.intent.displayName == 'Deploy de Aplicação'){
        const version = result.parameters.fields.Version.stringValue;
        const deployName = result.parameters.fields.Name.stringValue;
        const images = result.parameters.fields.Images.stringValue;
        const response = await Kubernetes.createDeploy(deployName, images, version);
    }

    sendTelegramMessage(result.fulfillmentText, currentChatId)
}

function sendTelegramMessage(message, id){
    sendMessage(message, id);
}

module.exports = {
    getUpdates,
    // sendMessage
}