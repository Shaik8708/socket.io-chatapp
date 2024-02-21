const express = require("express");
const router = express.Router();
const RoomController = require("../controller/roomController");

router.post("/", RoomController.createRoom);
router.get("/", RoomController.getAllRooms);

module.exports = router;