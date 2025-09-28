// import React, { useState } from "react";
// import { createMessage } from "../api";

// const MessageForm = ({ onMessageSent }) => {
//   const [senderId, setSenderId] = useState("");
//   const [receiverId, setReceiverId] = useState("");
//   const [content, setContent] = useState("");

//   const handleSubmit = async (event) => {
//     event.preventDefault(); // prevent default browser navigation

//     if (!senderId || !receiverId || !content.trim()) {
//       return;
//     }

//     try {
//       // Send message to backend
//       const newMessage = await createMessage({
//         sender_id: senderId,
//         receiver_id: receiverId,
//         content,
//       });

//       // Append to parent state
//       onMessageSent(newMessage);

//       // Clear form
//       setSenderId("");
//       setReceiverId("");
//       setContent("");
//     } catch (err) {
//       console.error("Error creating message:", err);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h3>Send a Message</h3>
//       <div>
//         <input
//           type="text"
//           placeholder="Sender ID"
//           value={senderId}
//           onChange={(e) => setSenderId(e.target.value)}
//         />
//       </div>
//       <div>
//         <input
//           type="text"
//           placeholder="Receiver ID"
//           value={receiverId}
//           onChange={(e) => setReceiverId(e.target.value)}
//         />
//       </div>
//       <div>
//         <input
//           type="text"
//           placeholder="Message Content"
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//         />
//       </div>
//       <button type="submit">Send</button>
//     </form>
//   );
// };

// export default MessageForm;
