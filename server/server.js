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
      generateMessage("Rob O. Bot", "Hello! Welcome to Chatterbot!")
    );
    setTimeout(
      () =>
        socket.emit(
          "newMessage",
          generateMessage(
            "Rob O. Bot",
            "This application is pretty self-explanatory."
          )
        ),
      3000
    );
    setTimeout(
      () =>
        socket.emit(
          "newMessage",
          generateMessage(
            "Rob O. Bot",
            "First, join a chat room with your friends."
          )
        ),
      7000
    );
    setTimeout(
      () =>
        socket.emit(
          "newMessage",
          generateMessage(
            "Rob O. Bot",
            "Then, send each other messages in real-time!"
          )
        ),
      10000
    );

    setTimeout(
      () =>
        socket.emit("newMessage", generateMessage("Rob O. Bot", "😎 😎 😎")),
      12000
    );
    setTimeout(
      () =>
        socket.emit(
          "newMessage",
          generateMessage(
            "Rob O. Bot",
            "If you do have any questions though, please do NOT hesitate to ask!"
          )
        ),
      15000
    );

    setTimeout(
      () =>
        socket.emit(
          "newMessage",
          generateMessage(
            "Rob O. Bot",
            "I just won't actually be able to answer any of them."
          )
        ),
      18000
    );

    setTimeout(
      () =>
        socket.emit(
          "newMessage",
          generateMessage("Rob O. Bot", "The questions.")
        ),
      20000
    );

    setTimeout(
      () =>
        socket.emit(
          "newMessage",
          generateMessage(
            "Rob O. Bot",
            "Because I'm not actually all that special."
          )
        ),
      22000
    );

    setTimeout(
      () =>
        socket.emit(
          "newMessage",
          generateMessage(
            "Rob O. Bot",
            "Just a bundle of hard-coded nonsense :("
          )
        ),
      24000
    );
    setTimeout(
      () =>
        socket.emit(
          "newMessage",
          generateMessage(
            "Rob O. Bot",
            "But, I promise, I do read every single one!"
          )
        ),
      27000
    );

    socket.broadcast
      .to(room)
      .emit("newMessage", generateMessage("Rob O. Bot", `${name} has joined!`));
  });

  socket.on("createMessage", ({ text }, callback) => {
    const user = users.getUser(socket.id);
    if (user && isRealString(text)) {
      io.to(user.room).emit("newMessage", generateMessage(user.name, text));
    }
    callback();
  });

  socket.on("createLocationMessage", ({ lat, lng }) => {
    const user = users.getUser(socket.id);
    if (user) {
      io
        .to(user.room)
        .emit(
          "newLocationMessage",
          generateLocationMessage(user.name, lat, lng)
        );
    }
  });

  socket.on("disconnect", () => {
    const user = users.removeUser(socket.id);
    if (user) {
      io.to(user.room).emit("updateUserList", users.getUserList(user.room));
      io
        .to(user.room)
        .emit(
          "newMessage",
          generateMessage("Rob O. Bot", `${user.name} has left.`)
        );
    }
  });
});
server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
