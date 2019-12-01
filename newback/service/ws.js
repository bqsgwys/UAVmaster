const io = require("socket.io")()
const db = require("./db")

io.use(async (socket, next) => {
  if (!socket.handshake.query || !socket.handshake.query.groupId)
    return next(new Error('Query not Given'));
  socket.groupId = socket.handshake.query.groupId;
  let lst = (await db.list);
  if (lst.indexOf(socket.groupId) == -1) return next(new Error('Group not Found'));
  return next();
});
io.on('connect', function (socket) {
  socket.join(`${socket.groupId}`);
});

function say(id) {
  io.to(`${id}`).emit("re", `${Date.now()}`);
}
module.exports = {
  io,
  say
};