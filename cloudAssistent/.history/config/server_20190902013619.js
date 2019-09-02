const http = require('http');
const manager = require('../telegram/manageBot');
const dialogflow = require('../dialogflow/dialogflow');

const hostname = 'localhost';
const port = 3000;
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
  // dialogflow.runSample();
  // manager.getUpdates(null, null);
})