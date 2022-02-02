const Sequelize = require("sequelize");
const db = require("../db");
const { Group } = require("./group");
const { User } = require("./user");

const Group_User = db.define("group_user", {
  groupId: {
    type: Sequelize.INTEGER,
    references: {
      model: Group,
      key: "id",
    },
  },
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
});

module.exports = Group;
