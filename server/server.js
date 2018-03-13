const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static("public"));

io.on("connection", socket => {
  console.log("new user connected");

  socket.emit("newMessage", {
    from: "me",
    text: "Hello",
    createdAt: 123
  });

  socket.on("createMessage", message => {
    console.log(message);
  });

  socket.on("disconnect", () => {
    console.log("user was disconnected!");
  });
});
server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
