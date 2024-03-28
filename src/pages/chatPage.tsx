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

  const clearNotification = (person: string) => {
    if (window.location.href.split("/")[3] !== person) {
      chatStore.init();
    }
  };

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
        <button onClick={() => clearNotification("first-person")}>
          <div style={{ display: "flex", alignItems: "center" }}>
            Person 1
            {window.location.href.split("/")[3] !== "first-person" && (
              <div style={{ position: "relative", marginLeft: "10px" }}>
                <ChatBubbleIcon />
                <div
                  style={{
                    position: "absolute",
                    right: "-5px",
                    top: "-5px",
                    backgroundColor: "red",
                    borderRadius: "50%",
                    width: "20px",
                    height: "20px",
                    color: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "12px",
                  }}
                >
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
          <div style={{ display: "flex", alignItems: "center" }}>
            Person 2
            {window.location.href.split("/")[3] !== "second-person" && (
              <div style={{ position: "relative", marginLeft: "10px" }}>
                <ChatBubbleIcon />
                <div
                  style={{
                    position: "absolute",
                    right: "-5px",
                    top: "-5px",
                    backgroundColor: "red",
                    borderRadius: "50%",
                    width: "20px",
                    height: "20px",
                    color: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "12px",
                  }}
                >
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
