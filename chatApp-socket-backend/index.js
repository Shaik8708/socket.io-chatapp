const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const mongoose = require("mongoose");
const { Server } = require("socket.io");

const userRoutes = require("../chatApp-socket-backend/routes/userRoutes");
const roomRoutes = require("../chatApp-socket-backend/routes/roomRoutes");
const messageRoutes = require("../chatApp-socket-backend/routes/messageRoutes");

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
app.use("/rooms", roomRoutes);
app.use("/messages", messageRoutes);

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

io.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});

io.on("connection", (socket) => {
  socket.on("join", (data) => {
    console.log('a user joined');
    socket.join(data.room);
    io.in(data.room).emit("User Joined", data);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on("message", (data) => {
    io.in(data.room).emit("new message", {
      user: data.user,
      message: data.message,
      senderId: data.senderId,
      timestamp: data.timestamp
    });
  });
});

