const express = require("express");
const http = require("http");
const path = require("path");
const socketio = require("socket.io");
const Filter = require("bad-words");

const publicDirPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(publicDirPath));

io.on("connection", (socket) => {
  console.log("New web socket connection");

  socket.broadcast.emit("helpMessage", "A new user has joined!");

  socket.emit("helpMessage", "Welcome");

  socket.on("sendMessage", (message, callback) => {
    const filter = new Filter();

    if (filter.isProfane(message)) {
      return callback("Profanity is not allowed");
    }
    io.emit("message", message);
    callback();
  });

  socket.on("sendLocation", (coords, callback) => {
    const { latitude, longitude } = coords;
    io.emit(
      "locationMessage",
      `https://google.com/maps?q=${latitude},${longitude}`
    );
    callback("Location Shared!");
  });

  socket.on("disconnect", () => {
    io.emit("helpMessage", "A user has left.");
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
