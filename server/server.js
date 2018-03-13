const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const { generateMessage, generateLocationMessage } = require("./utils/message");

const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static("public"));

io.on("connection", socket => {
  socket.emit(
    "newMessage",
    generateMessage("admin", "welcome to the chat app!")
  );
  socket.broadcast.emit(
    "newMessage",
    generateMessage("admin", "new user joined!")
  );
  socket.on("createMessage", ({ from, text }, callback) => {
    io.emit("newMessage", generateMessage(from, text));
    callback("This is from the server");
  });

  socket.on("createLocationMessage", ({ lat, lng }) => {
    io.emit("newLocationMessage", generateLocationMessage("admin", lat, lng));
  });

  socket.on("disconnect", () => {
    console.log("user was disconnected!");
  });
});
server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
