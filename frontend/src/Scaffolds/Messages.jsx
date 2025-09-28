// import React, { useState, useEffect } from "react";
// import { getMessages } from "../api";
// import MessageForm from "./MessageForm";

// const Messages = () => {
//   console.log("Messages component rendered"); // top-level log
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Load initial messages
//   useEffect(() => {
//     console.log("useEffect fired"); // log when effect starts
//     const loadMessages = async () => {
//       try {
//         const msgs = await getMessages();
//         console.log("DEBUG:messages received from API", msgs); // log fetched messages
//         setMessages(Array.isArray(msgs) ? msgs : []);
//       } catch (err) {
//         console.error("Error fetching messages:", err);
//         setMessages([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadMessages();
//   }, []);

//   // Append new message
//   const handleAddMessage = (newMessage) => {
//     setMessages((prev) => [...prev, newMessage]);
//   };

//   if (loading) return <p>Loading messages...</p>;
// console.log("Rendering messages:", messages); // log before rendering
//   return (
//     <div>
//       <h2>Messages</h2>
//       <MessageForm onMessageSent={handleAddMessage} />
//       <ul>
//         {messages.length > 0 ? (
//           messages.map((msg) => (
//             <li key={msg.id}>
//               {msg.content} — from user {msg.sender_id} to {msg.receiver_id}
//             </li>
//           ))
//         ) : (
//           <li>No messages found.</li>
//         )}
//       </ul>
//     </div>
//   );
// };

// export default Messages;

