const express = require("express");
const router = express.Router();
const MessageController = require("../controller/messageController");

router.post("/", MessageController.addMessage);
router.get("/", MessageController.getAllMessages);
router.put("/:roomId", MessageController.updateMessages);

module.exports = router;