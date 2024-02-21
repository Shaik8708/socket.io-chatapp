const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  roomId: { type: String, required: true },
  chats: { type: Array, required: true },
});

module.exports = mongoose.model("message", messageSchema);
