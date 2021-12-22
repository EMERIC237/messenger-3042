import React from "react";
import { Box, Typography, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: 20,
    flexGrow: 1,
  },
  username: {
    fontWeight: "bold",
    letterSpacing: -0.2,
  },
  previewText: {
    fontSize: 12,
    color: "#9CADC8",
    letterSpacing: -0.17,
  },
  avatarIcon: {
    maxHeight: 25,
    maxWidth: 30,
    backgroundColor: "#2B6AD0",
    fontSize: 12,
  },
}));

const ChatContent = (props) => {
  const classes = useStyles();
  const { conversation } = props;
  const { latestMessageText, messages, otherUser } = conversation;
  const unreadMessagesOcc = messages.reduce(
    (acc, message) =>
      message.is_read === false && message.senderId === otherUser.id
        ? acc + 1
        : acc,
    0
  );

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography className={classes.previewText}>
          {latestMessageText}
        </Typography>
      </Box>
      {unreadMessagesOcc ? (
        <Avatar className={classes.avatarIcon}>{unreadMessagesOcc}</Avatar>
      ) : null}
    </Box>
  );
};

export default ChatContent;
