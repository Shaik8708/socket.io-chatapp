const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
});

module.exports = mongoose.model("room", roomSchema);
