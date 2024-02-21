const User = require("../models/users");

exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await User.findOneAndUpdate({ id: id }, updatedData, {
      useFindAndModify: false,
    });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
