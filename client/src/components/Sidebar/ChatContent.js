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
  previewTextBold: {
    fontWeight: "bold",
    fontSize: 12,
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
  const { latestMessageText, unreadMessagesCount, otherUser } = conversation;


  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography
          className={
            unreadMessagesCount ? classes.previewTextBold : classes.previewText
          }
        >
          {latestMessageText}
        </Typography>
      </Box>
      {unreadMessagesCount > 0 && (
        <Avatar className={classes.avatarIcon}>{unreadMessagesCount}</Avatar>
      )}
    </Box>
  );
};

export default ChatContent;
