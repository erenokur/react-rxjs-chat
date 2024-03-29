import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import chatStore from "../store/chatStore";
import "./chatPage.css";

function ChatPage() {
  const [chatState, setChatState] = useState(chatStore.initialState);
  const navigate = useNavigate();

  useEffect(() => {
    chatStore.subscribe(setChatState);
    chatStore.init();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Tab") {
        event.preventDefault();
        chatStore.init();
        const currentPerson = window.location.href.split("/")[3];
        const nextPerson =
          currentPerson === "first-person" ? "second-person" : "first-person";
        navigate(`/${nextPerson}`);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const clearNotification = (person: string) => {
    if (window.location.href.split("/")[3] !== person) {
      chatStore.init();
    }
  };

  return (
    <div className="container">
      <NavLink
        to="/first-person"
        style={({ isActive }) => ({
          border: isActive ? "2px solid #00ade7" : "",
          padding: 0,
          borderRadius: 30,
        })}
      >
        <button onClick={() => clearNotification("first-person")}>
          <div className="button-container">
            Person 1
            {window.location.href.split("/")[3] !== "first-person" &&
              chatState.newDataCount > 0 && (
                <div className="notification-bubble">
                  <ChatBubbleIcon />
                  <div className="notification-count">
                    {chatState.newDataCount}
                  </div>
                </div>
              )}
          </div>
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
        <button onClick={() => clearNotification("second-person")}>
          <div className="button-container">
            Person 2
            {window.location.href.split("/")[3] !== "second-person" &&
              chatState.newDataCount > 0 && (
                <div className="notification-bubble">
                  <ChatBubbleIcon />
                  <div className="notification-count">
                    {chatState.newDataCount}
                  </div>
                </div>
              )}
          </div>
        </button>
      </NavLink>
    </div>
  );
}

export default ChatPage;
