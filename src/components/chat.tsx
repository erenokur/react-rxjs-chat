import React, { useState, useLayoutEffect } from "react";
import { Avatar, Button, Container, Grid, TextField } from "@material-ui/core";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import chatStore, { Message } from "../store/chatStore";

interface ChatProps {
  person: string;
}

const Chat: React.FC<ChatProps> = ({ person }) => {
  const [chatState, setChatState] = useState(chatStore.initialState);
  useLayoutEffect(() => {
    chatStore.subscribe(setChatState);
    chatStore.init();
  }, []);

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const messageText = formData.get("messageInput") as string;
    const messageObject: Message = {
      person: person,
      text: messageText.trim(),
    };
    chatStore.sendMessage(messageObject);
    e.currentTarget.reset();
  };

  return (
    <Container maxWidth="sm">
      <h2>{person}</h2>
      <div className="chat-box">
        {chatState.data.map((message: Message, index: number) => (
          <Grid
            container
            spacing={1}
            alignItems="center"
            style={{
              justifyContent:
                message.person === "Person 1" ? "flex-start" : "flex-end",
            }}
            key={index}
          >
            <Grid item>
              <Avatar>{message.person.slice(-1)}</Avatar>
            </Grid>
            <Grid item>
              <p className={message.person}>{message.text}</p>
            </Grid>
          </Grid>
        ))}
      </div>
      <form id="messageForm" onSubmit={onFormSubmit}>
        <Grid container spacing={1} alignItems="center">
          <Grid item>
            <TextField
              type="text"
              id="messageInput"
              name="messageInput"
              placeholder="Type here..."
              required
            />
          </Grid>
          <Grid item>
            <Button type="submit" variant="contained" color="primary">
              Send
            </Button>
          </Grid>
        </Grid>
      </form>
      <Button className="clear-button" onClick={() => chatStore.clearChat()}>
        Clear Chat
      </Button>
    </Container>
  );
};

export default Chat;
