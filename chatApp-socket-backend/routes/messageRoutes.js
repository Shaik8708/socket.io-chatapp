const express = require("express");
const router = express.Router();
const MessageController = require("../controller/messageController");

router.post("/", MessageController.addMessage);
router.get("/", MessageController.getAllMessages);
router.put("/:roomId", MessageController.updateMessages);
router.get("/:roomId", MessageController.getMessagesByRoom);

module.exports = router;