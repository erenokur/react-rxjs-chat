import React, { useState, useLayoutEffect, useEffect, useRef } from "react";
import { Avatar, Button, Container, Grid, TextField } from "@material-ui/core";
import chatStore, { Message } from "../store/chatStore";
import "./chat.css";

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
    <Container maxWidth={false} className="chat-container">
      <h2 className="h2">{person}</h2>
      <p className="p">Tab to change user, Enter to send message</p>
      <div className="chat-box">
        {chatState.data.map((message: Message, index: number) => (
          <Grid
            container
            spacing={1}
            alignItems="center"
            className={
              message.person === "Person 1"
                ? "grid-container"
                : "grid-container-end"
            }
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
      <form className="messageForm" onSubmit={onFormSubmit}>
        <Grid container spacing={1} alignItems="center" justifyContent="center">
          <Grid item>
            <TextField
              type="text"
              id="messageInput"
              name="messageInput"
              placeholder="Type here..."
              required
              InputProps={{ className: "text-field" }}
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
