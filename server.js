'use strict';

const { TOKEN_VALID, AppServiceType, ServiceType } = require("./constant");
const express = require('express');
const { Server } = require('ws');

const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const isTokenValid = token => {
  return token && token === TOKEN_VALID;
};

const handleTokenInvalid = (ws, data) => {
  ws.send(
    JSON.stringify({
      data: {
        processed: 1,
        response: [],
        supporter: "BOT",
        status: {
          code: "01",
          description: "Invalid token"
        },
        timestamp: 0
      },
      AppServiceType: "USER_LOGIN",
      type: 2
    })
  );
};

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const wss = new Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on("message", function(message) {
    // console.log('received: %s', message)
    try {
      let data = JSON.parse(message);
      console.log("Receive::", data);
      console.log("Token isValid::", isTokenValid(data.token));

      if (!isTokenValid(data.token)) {
        handleTokenInvalid(ws, data);
        return;
      }

      switch (data.service) {
        case ServiceType.USER_LOGIN:
          console.log("USER_LOGIN");
          ws.send(
            JSON.stringify({
              data: {
                processed: 1,
                response: [],
                supporter: "BOT",
                timestamp: 0,
                status: {
                  code: "00",
                  description: "Login success"
                }
              },
              AppServiceType: "USER_LOGIN",
              type: 2
            })
          );
          break;

        case 5:
          break;

        case 8:
          break;
      }
    } catch (error) {}
  });

  ws.on('close', () => console.log('Client disconnected'));
});

setInterval(() => {
  wss.clients.forEach((client) => {
    client.send(new Date().toTimeString());
  });
}, 1000);


