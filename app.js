const Express = require("express")();
const Http = require("http").Server(Express);
const Socketio = require("socket.io")(Http, {
  cors: {
    origin: "*",
  },
});

const PORT = process.env.PORT || 5000;

Socketio.on("connection", (socket) => {
  socket.on("join_room", (room) => {
    socket.join(room);
  });

  socket.on("emit_room", (room) => {
    Socketio.sockets.to(room).emit("emit_room", room);
  });

  socket.on("delete_room", (room) => {
    Socketio.sockets.to(room).emit("emit_room", room + " code room closed.");
    socket.leave(room);
  });
});

Http.listen(PORT, () => {
  console.log("Ready on http://localhost:" + PORT);
});
