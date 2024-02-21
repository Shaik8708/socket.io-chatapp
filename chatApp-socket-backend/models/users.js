const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  roomId: { type: Object, required: false },
});

module.exports = mongoose.model("user", userSchema);
