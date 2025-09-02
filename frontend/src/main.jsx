import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from "./Components/AuthContext" //importing the provider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider> {/* Wrapping the app with AuthProvider */}
    <App />
    </AuthProvider>
  </StrictMode>
);
