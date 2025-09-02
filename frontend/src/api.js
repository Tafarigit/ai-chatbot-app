import axios from "axios";

const API_URL = "http://localhost:3001";
// const API_URL =  //backend URL
export const getUsers = () => axios.get(`${API_URL}/users`);

export const getUserById = (id) => axios.get(`${API_URL}/users/${id}`);

export const createUser = (data) => axios.post(`${API_URL}/users`, data);

// Get all messages
export const getMessages = async (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  const url = params ? `${API_URL}/api/messages?${params}` : `${API_URL}/api/messages`;
  console.log("DEBUG: fetching from URL:", url);
  const response = await axios.get(url);
  console.log("DEBUG: raw response:", response);
  return response.data; // <-- array of messages
};

// Get one message by ID
export const getMessageById = async (id) => {
  const response = await axios.get(`${API_URL}/api/messages/${id}`);
  return response.data; // <-- single message object
};

// Create a new message
export const createMessage = async (messageData) => {
  const response = await axios.post(`${API_URL}/api/messages`, messageData);
  return response.data; // <-- newly created message object
};
