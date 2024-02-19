const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const mongoose = require("mongoose");
const { Server } = require("socket.io");

const userRoutes = require("../chatApp-socket-backend/routes/userRoutes");

require("dotenv").config();

app.use(cors());

const parser = express.json();
app.use(express.urlencoded({ extended: true }));
app.use(parser);

const httpServer = http.createServer(app);
const dbStr = process.env.DATABASE_URL;

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:4200",
  },
});

mongoose.connect(dbStr, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/users", userRoutes);

const database = mongoose.connection;
database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
  console.log("working on port ", PORT);
});

io.on("connection", (socket) => {
  socket.on("join", (data) => {
    socket.join(data.room);
    socket.broadcast.to(data.room).emit("User Joined");
  });
  socket.on("message", (data) => {
    io.in(data.room).emit("new message", {
      user: data.user,
      message: data.message,
    });
  });
});
