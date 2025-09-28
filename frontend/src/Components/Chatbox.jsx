import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "./useAuth";
import { useNavigate } from 'react-router-dom';
import { sendMessage } from '../api';

const Chatbox = () => {
  const { user, logoutUser } = useAuth(); // Added logoutUser
  const navigate = useNavigate(); // Added navigate
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Initial AI greeting when user logs in
  useEffect(() => {
    if (user && messages.length === 0) {
      const welcomeMessage = {
        sender: "AI Agent",
        text: `Hello ${user.username}! Welcome back. I'm here to help with any questions you might have. How can I assist you today?`,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [user, messages.length]);

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessageText = input.trim();

    // Add user message optimistically
    const userMessage = { 
      sender: user.username, 
      text: userMessageText,
      timestamp: new Date()
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // Call backend chatbot route using centralized API
      const response = await sendMessage({
        userMessage: userMessageText,
        userId: user.id,
      });

      const botMessage = {
        sender: "AI Agent",
        text: response.data.botMessage.content, // returned from backend
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("Error sending message to backend:", err);
      const errorMsg = { 
        sender: "AI Agent", 
        text: "Sorry, something went wrong. Please try again.",
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleEndChat = () => {
    setMessages([]);
  };

  const handleLogout = () => {
    logoutUser(); // Use the auth context function
    navigate('/login');
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div style={styles.chatbox}>
      <div style={styles.header}>
        <h2>Chat with AI Agent</h2>
        <div style={styles.buttonGroup}>
          <button onClick={handleEndChat} style={styles.endChatButton}>
            End Chat
          </button>
          <button onClick={handleLogout} style={styles.logoutButton}>
            Logout
          </button>
        </div>
      </div>
      <div style={styles.messages}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              ...styles.message,
              alignSelf: msg.sender === user.username ? "flex-end" : "flex-start",
              backgroundColor: msg.sender === user.username ? "#e3f2fd" : "#f5f5f5",
              color: "#333",
            }}
          >
            <div style={styles.messageHeader}>
              <strong>{msg.sender}</strong>
              <span style={styles.timestamp}>
                {formatTimestamp(msg.timestamp)}
              </span>
            </div>
            <div style={styles.messageText}>{msg.text}</div>
          </div>
        ))}
        {loading && (
          <div style={{...styles.message, alignSelf: "flex-start", backgroundColor: "#f5f5f5"}}>
            <div style={styles.messageHeader}>
              <strong>AI Agent</strong>
            </div>
            <div style={styles.messageText}>
              <span style={styles.typingIndicator}>AI is thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          style={styles.input}
          placeholder={loading ? "AI is responding..." : "Type your message... (Press Enter to send)"}
          disabled={loading}
        />
        <button 
          onClick={handleSend} 
          style={{
            ...styles.sendButton,
            opacity: loading || !input.trim() ? 0.6 : 1,
            cursor: loading || !input.trim() ? 'not-allowed' : 'pointer'
          }}
          disabled={loading || !input.trim()}
        >
          {loading ? "..." : "Send"}
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
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
    paddingBottom: "10px",
    borderBottom: "1px solid #eee"
  },
  buttonGroup: {
    display: "flex",
    gap: "8px"
  },
  endChatButton: {
    padding: "6px 12px",
    borderRadius: "4px",
    border: "1px solid #ddd",
    backgroundColor: "#f8f9fa",
    color: "#495057",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "500"
  },
  logoutButton: {
    padding: "6px 12px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#dc3545",
    color: "#fff",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "500"
  },
  messages: {
    flex: 1,
    overflowY: "auto",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    height: "300px",
  },
  message: {
    padding: "8px 12px",
    borderRadius: "8px",
    maxWidth: "75%",
    boxShadow: "0 1px 2px rgba(0,0,0,0.1)"
  },
  messageHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "4px",
    fontSize: "0.85em"
  },
  messageText: {
    fontSize: "0.95em",
    lineHeight: "1.4"
  },
  timestamp: {
    color: "#666",
    fontSize: "0.8em"
  },
  typingIndicator: {
    fontStyle: "italic",
    color: "#666"
  },
  inputContainer: {
    display: "flex",
    marginTop: "10px",
    gap: "8px"
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "14px"
  },
  sendButton: {
    padding: "10px 15px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#007BFF",
    color: "#fff",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.2s ease"
  }
};

export default Chatbox;