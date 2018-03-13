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
  socket.emit("newMessage", {
    from: "Admin",
    text: "Welcome to the chat app",
    createdAt: new Date().getTime()
  });
  socket.broadcast.emit("newMessage", {
    from: "Admin",
    text: "New user joined",
    createdAt: new Date().getTime()
  });
  socket.on("createMessage", ({ from, text }) => {
    console.log(from, text);
    io.emit("newMessage", {
      from,
      text,
      createdAt: new Date().getTime()
    });
  });

  socket.on("disconnect", () => {
    console.log("user was disconnected!");
  });
});
server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
