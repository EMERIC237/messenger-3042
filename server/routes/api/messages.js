const router = require("express").Router();
const { Conversation, Message } = require("../../db/models");
const onlineUsers = require("../../onlineUsers");

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    const { recipientId, text, conversationId, sender, is_read } = req.body;

    // if we already know conversation id, we can save time and just add it to message and return
    if (conversationId) {
      const message = await Message.create({
        senderId,
        text,
        conversationId,
        is_read,
      });
      return res.json({ message, sender });
    }
    // if we don't have conversation id, find a conversation to make sure it doesn't already exist
    let conversation = await Conversation.findConversation(
      senderId,
      recipientId
    );

    if (!conversation) {
      // create conversation
      conversation = await Conversation.create({
        user1Id: senderId,
        user2Id: recipientId,
      });
      if (onlineUsers.includes(sender.id)) {
        sender.online = true;
      }
    }

    const message = await Message.create({
      senderId,
      text,
      conversationId: conversation.id,
      is_read,
    });
    res.json({ message, sender });
  } catch (error) {
    next(error);
  }
});

//Update the conversation messages when the user read them
router.put("/:senderId", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const { senderId } = req.params;
    const recipientId = req.body.userId;
    let conversation = await Conversation.findConversation(
      senderId,
      recipientId
    );
    if (!conversation) {
      res.status(400).send({
        status: "error",
        message: `conversation between ${senderId} and ${recipientId} not existing`,
      });
    }

    const UpdatedMessages = await Message.update(
      { is_read: true },
      { where: { senderId: senderId } }
    );

    if (!UpdatedMessages) {
      res.status(400).send({
        status: "error",
        message: `data message with senderId ${senderId} failed update`,
      });
    }
    res.json(UpdatedMessages);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
