const Message = require("../models/messages");

exports.addMessage = async (req, res) => {
  try {
    const message = new Message(req.body);
    const savedMessage = await message.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateMessages = async (req, res) => {
  try {
    const roomId = req.params.roomId;
    const updatedData = req.body;
    const result = await Message.findOneAndUpdate(
      { roomId: roomId },
      updatedData,
      { new: true, useFindAndModify: false }
      );
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};