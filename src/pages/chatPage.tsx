import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import chatStore from "../store/chatStore";

function ChatPage() {
  const [chatState, setChatState] = useState(chatStore.initialState);

  useEffect(() => {
    chatStore.subscribe(setChatState);
    chatStore.init();
  }, []);

  const messageNotification = chatState.newDataCount > 0 && (
    <span className="notify">{chatState.newDataCount}</span>
  );

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <NavLink
        to="/first-person"
        style={({ isActive }) => ({
          border: isActive ? "2px solid #00ade7" : "",
          padding: 0,
          borderRadius: 30,
        })}
      >
        <button>
          Person 1
          {window.location.href.split("/")[3] !== "first-person" && (
            <ChatBubbleIcon>{messageNotification}</ChatBubbleIcon>
          )}
        </button>
      </NavLink>

      <NavLink
        to="/second-person"
        style={({ isActive }) => ({
          border: isActive ? "2px solid #06c406" : "",
          padding: 0,
          borderRadius: 30,
        })}
      >
        <button className="ChatPage">
          Person 2
          {window.location.href.split("/")[3] !== "second-person" && (
            <ChatBubbleIcon>{messageNotification}</ChatBubbleIcon>
          )}
        </button>
      </NavLink>
    </div>
  );
}

export default ChatPage;
