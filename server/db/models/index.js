const User = require("./user");
const Message = require("./message");
const Group = require("./group");
const Message_Receiver = require("./message_receicer");
const Group_User = require("./group_user");

// associations
A.hasOne(B); // A HasOne B
A.belongsTo(B); // A BelongsTo B
A.hasMany(B); // A HasMany B

User.belongsToMany(Group, { through: "group_user" });
Group.belongsToMany(User, { through: "group_user" });
User.hasMany(Message);
Message.belongsTo(User);
Message_Receiver.belongsTo(Group_User);
Message_Receiver.belongsTo(User);
Message_Receiver.belongsTo(Message);
Group_User.hasMany(Message_Receiver);
User.hasMany(Message_Receiver);
Message.hasMany(Message_Receiver);

module.exports = {
  User,
  Message,
  Group,
};
