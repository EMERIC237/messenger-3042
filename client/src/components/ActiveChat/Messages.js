import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import { updateMessages } from "../../store/utils/thunkCreators";
import moment from "moment";

const Messages = (props) => {
  const { conversationId, messages, otherUser, userId, updateMessages } = props;

  useEffect(() => {
    async function update() {
      await updateMessages(otherUser.id, conversationId);
    }
    update();
  }, [conversationId, otherUser.id, updateMessages]);

  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format("h:mm");
        return message.senderId === userId ? (
          <SenderBubble key={message.id} text={message.text} time={time} />
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
    updateMessages: (senderId, conversationId) => {
      dispatch(updateMessages(senderId, conversationId));
    },
  };
};

export default connect(null, mapDispatchToProps)(Messages);
