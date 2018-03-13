const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const { generateMessage, generateLocationMessage } = require("./utils/message");
const { isRealString } = require("./utils/validation");
const { Users } = require("./utils/users");

const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const users = new Users();

app.use(express.static("public"));

io.on("connection", socket => {
  socket.on("join", ({ name, room }, callback) => {
    if (!isRealString(name) || !isRealString(room)) {
      return callback("Username and Room are required.");
    }

    socket.join(room);
    users.removeUser(socket.id);
    users.addUser(socket.id, name, room);
    io.to(room).emit("updateUserList", users.getUserList(room));
    socket.emit(
      "newMessage",
      generateMessage("admin", "welcome to the chat app!")
    );
    socket.broadcast
      .to(room)
      .emit("newMessage", generateMessage("admin", `${name} has joined!`));
  });
  socket.on("createMessage", ({ from, text }, callback) => {
    io.emit("newMessage", generateMessage(from, text));
    callback();
  });

  socket.on("createLocationMessage", ({ lat, lng }) => {
    io.emit("newLocationMessage", generateLocationMessage("admin", lat, lng));
  });

  socket.on("disconnect", () => {
    const user = users.removeUser(socket.id);
    if (user) {
      io.to(user.room).emit("updateUserList", users.getUserList(user.room));
      io
        .to(user.room)
        .emit("newMessage", generateMessage("admin", `${user.name} has left.`));
    }
  });
});
server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
