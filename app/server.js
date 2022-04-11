const express = require("express");
const { Server } = require("ws");

const PORT = process.env.PORT || 3000;
const INDEX = "/index.html";

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const WSS = new Server({ server });

WSS.on("connection", (ws) => {
  ws.on("message", (message) => {
    WSS.clients.forEach((client) => {
      client.send(message);
    });
  });

  ws.on("close", () => console.log("Client disconnected"));
});
