import React, { useState, useLayoutEffect, useEffect, useRef } from "react";
import { Avatar, Button, Container, Grid, TextField } from "@material-ui/core";
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

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [chatState.data]);

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
    <Container
      maxWidth={false}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <h2
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        {person}
      </h2>
      <div
        className="chat-box"
        style={{
          overflowY: "scroll",
          overflowX: "hidden",
          height: "70vh",
          width: "100%",
        }}
      >
        {chatState.data.map((message: Message, index: number) => (
          <Grid
            container
            spacing={1}
            alignItems="center"
            style={{
              justifyContent:
                message.person === "Person 1" ? "flex-start" : "flex-end",
              paddingLeft: "10px",
              paddingRight: "10px",
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
        <div ref={messagesEndRef} />
      </div>
      <form id="messageForm" onSubmit={onFormSubmit}>
        <Grid container spacing={1} alignItems="center" justifyContent="center">
          <Grid item>
            <TextField
              type="text"
              id="messageInput"
              name="messageInput"
              placeholder="Type here..."
              required
              inputProps={{ style: { color: "white" } }}
            />
          </Grid>
          <Grid item>
            <Button type="submit" variant="contained" color="primary">
              Send
            </Button>
          </Grid>
        </Grid>
      </form>
      <Button
        className="clear-button"
        onClick={() => chatStore.clearChat()}
        style={{ color: "white" }}
      >
        Clear Chat
      </Button>
    </Container>
  );
};

export default Chat;
