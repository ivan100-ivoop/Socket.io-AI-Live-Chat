const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { v4: uuidv4 } = require('uuid');
const { Configuration, OpenAIApi } = require("openai");
var hljs = require('highlight.js');

const configuration = new Configuration({
  apiKey: process.env.TOKEN,
});
const openai = new OpenAIApi(configuration);

const app = express();
app.use(express.static('public'));
const server = http.createServer(app);
const io = socketIo(server);

let clients = [];

io.on('connection', async (clientsocket) => {

  const clientId = uuidv4();
  clients.push({ id: clientId, socket: clientsocket });

  const models = await openai.listEngines();
  clientsocket.emit('uuid', { id: clientId });
  clientsocket.emit('modules', { default: 'text-davinci-003', module: models.data.data });

  clientsocket.on('request', (data) => !data.id ? clientsocket.emit('response', { message: "missing id" }) : client_callback(clientId, data));

  clientsocket.on('disconnect', () => clients = clients.filter((client) => client.id !== clientId));
});

async function client_callback(uuid, data) {
  if (!data.message) {
    return socket.emit('response', { message: "Error message is not Found!" })
  }
  if (!data.module) {
    data.module = 'text-davinci-003';
  }
  const client = clients.find((client) => client.id === uuid);
  if (client && client.socket) {
    const socket = client.socket;
    const completion = await openai.createCompletion({
      model: data.module,
      prompt: data.message,
      max_tokens: 258,
      temperature: 0.9,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop: [`Human:`, `AI`]
    }).then((response) => {
      let out = response.data.choices[0].text;
      const lang = hljs.highlightAuto(out).value;
      socket.emit('message', { message: (lang ? lang : out) });
    }).catch((err) => {
      console.log(err);
      socket.emit('response', { message: err });
    });
  } else {
    return socket.emit('response', { message: `Client with ID ${uuid} not found or socket is undefined.` });
  }
}

server.listen(3000, () => {
  console.log('Listening on port 3000.');
});
