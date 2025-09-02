import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "./useAuth";

const Chatbox = () => {
  const { user } = useAuth(); // current logged-in user
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    // User message
    const userMessage = { sender: user.username, text: input };

    // Simple AI Agent response
    const botReply = { sender: "AI Agent", text: `You said: ${input}` };

    // Update chat state
    setMessages((prev) => [...prev, userMessage, botReply]);

    // Clear input field
    setInput("");
  };

  return (
    <div style={styles.chatbox}>
      <h2>Chat with our AI Agent</h2>
      <div style={styles.messages}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              ...styles.message,
              alignSelf: msg.sender === user.username ? "flex-end" : "flex-start",
              backgroundColor: msg.sender === user.username ? "#DCFC6" : "rgba(238, 238, 238, 0.7)",
            }}
          >
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={styles.input}
          placeholder="Type your message..."
        />
        <button onClick={handleSend} style={styles.sendButton}>
          Send
        </button>
      </div>
    </div>
  );
};

const styles = {
  chatbox: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "10px",
    width: "400px",
    margin: "20px auto",
    display: "flex",
    flexDirection: "column",
  },
  messages: {
    flex: 1,
    overflowY: "auto",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    height: "300px",
  },
  message: {
    padding: "8px",
    borderRadius: "4px",
    maxWidth: "75%",
  },
  inputContainer: {
    display: "flex",
    marginTop: "10px",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  sendButton: {
    padding: "10px 15px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#007BFF",
    color: "#fff",
    cursor: "pointer",
  },
};

export default Chatbox;


