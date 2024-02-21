const express = require("express");
const router = express.Router();
const UserController = require("../controller/userController");

router.post("/", UserController.createUser);
router.get("/", UserController.getAllUsers);
router.put("/", UserController.updateUser);

module.exports = router;
