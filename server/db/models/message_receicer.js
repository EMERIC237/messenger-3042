const Sequelize = require("sequelize");
const db = require("../db");
const { Message } = require("./message");
const { Group } = require("./group");
const { User } = require("./user");
const { Group_User } = require("./group_user");

const Message_Receiver = db.define("message_receiver", {
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
  group_UserId: {
    type: Sequelize.INTEGER,
    references: {
      model: Group_User,
      key: "id",
    },
  },
  messageId: {
    type: Sequelize.INTEGER,
    references: {
      model: Message,
      key: "id",
    },
  },
  isRead: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
});

module.exports = Message_Receiver;
