const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  roomId: { type: Object, required: true },
});

module.exports = mongoose.model("user", userSchema);
