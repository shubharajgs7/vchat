//node server which will handle socket io connection
const io = require("socket.io")(8000);

const users = {};
io.on("connection", socket => {
  socket.on("new-user-joined", myusername => {
    users[socket.id] = myusername;
    socket.broadcast.emit("user-joined", myusername);
  });
  socket.on("send", message => {
    socket.broadcast.emit("receive", {
      message: message,
      username: users[socket.id],
    });
  });
  socket.on("disconnect", message => {
    socket.broadcast.emit("left", users[socket.id]);
    delete users[socket.id];
  });
});