import axios from "axios";

const API_URL = "http://localhost:3001/api";

// Authentication
export const register = (userData) => axios.post(`${API_URL}/auth/register`, userData);

export const login = (userData) => axios.post(`${API_URL}/auth/login`, userData);

// Chatbot
export const sendMessage = (messageData) => axios.post(`${API_URL}/chatbot`, messageData);

// Test endpoint
export const testConnection = () => axios.get(`${API_URL}/test`);