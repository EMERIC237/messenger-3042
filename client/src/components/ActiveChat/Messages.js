import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import { updateMessages } from "../../store/utils/thunkCreators";
import moment from "moment";

const Messages = (props) => {
  const { conversationId, messages, otherUser, userId, updateMessages } = props;
  useEffect(() => {
    function update() {
      updateMessages(otherUser.id, conversationId, userId);
    }
    update();
  }, [conversationId, otherUser.id, updateMessages, userId]);

  return (
    <Box>
      {messages.map((message, index, arr) => {
        const time = moment(message.createdAt).format("h:mm");
        return message.senderId === userId ? (
          <SenderBubble
            key={message.id}
            text={message.text}
            time={time}
            otherUser={otherUser}
            messageIndex={index}
            length={arr.length}
          />
        ) : (
          <OtherUserBubble
            key={message.id}
            text={message.text}
            time={time}
            otherUser={otherUser}
            senderId={message.senderId}
          />
        );
      })}
    </Box>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateMessages: (senderId, conversationId, userId) => {
      dispatch(updateMessages(senderId, conversationId, userId));
    },
  };
};

export default connect(null, mapDispatchToProps)(Messages);
