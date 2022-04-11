const WebSocketServer = require("ws").Server;
const WSS = new WebSocketServer({ port: 8080 });

WSS.on("connection", (ws) => {
  ws.on("message", (message) => {
    WSS.clients.forEach((client) => {
      client.send(message);
    });
  });

  ws.on("close", () => console.log("Client disconnected"));
});
