const app = require("express")();
const http = require("http").createServer(app);
app.use(require("cors")());
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});
io.on("connection", (socket) => {
  console.log("a user connected");

  /*this is responsible for "catching" the event sent by the client 
  events are sent alongside a value so we can choose what to do with that value 
  in this case we are broadcasting the event to clients */
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
    io.emit("chat message", msg); // this is responsible for broadcasting the event to clients connected to the server using a socket.
  });
});
http.listen(3001, () => {
  console.log("listening on *:3001");
});
