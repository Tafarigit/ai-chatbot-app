# AI Chatbot Application

A full-stack web application featuring real-time AI-powered conversations with user authentication and message persistence.

## Features

- **User Authentication**: Secure registration and login system with bcrypt password hashing
- **Real-time Chat Interface**: Responsive chatbot UI with auto-scroll and optimistic updates
- **AI Integration**: Powered by Google's Gemini AI API for intelligent responses
- **Database Persistence**: User accounts and conversation history stored in PostgreSQL
- **Modern Stack**: React frontend with Node.js/Express backend

## Tech Stack

**Frontend:**
- React 18 with Hooks
- Axios for API communication
- Custom authentication context
- Responsive CSS styling

**Backend:**
- Node.js with Express framework
- PostgreSQL database with UUID primary keys
- bcrypt for password security
- CORS enabled for cross-origin requests

**External APIs:**
- Google Gemini AI API (v1beta)

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL database
- Google AI Studio API key

## Installation & Setup

### 1. Clone and Install Dependencies

```bash
git clone <your-repo-url>
cd ai-chatbot-app

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Database Setup

```bash
# Create PostgreSQL database
createdb chatdb

# Run schema setup
cd backend/db
psql -d chatdb -f schema.sql

# Optional: Add seed data for testing
psql -d chatdb -f seed.sql
```

### 3. Environment Configuration

Create `backend/.env`:

```env
GEMINI_API_KEY=your_gemini_api_key_here
DATABASE_URL=postgresql://username:password@localhost:5432/chatdb
PORT=3001
```

### 4. Get Google Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com/)
2. Create a new project (don't import existing)
3. Generate an API key
4. Complete the credential setup (select "Application data")

## Running the Application

### Start Backend Server
```bash
cd backend
npm start
# Server runs on http://localhost:3001
```

### Start Frontend Development Server
```bash
cd frontend
npm run dev
# Frontend runs on http://localhost:5173
```

## API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User authentication
- `POST /api/chatbot` - Send message to AI chatbot
- `GET /api/test` - Health check endpoint

## Database Schema

### Users Table
- `id` (UUID, Primary Key)
- `username` (VARCHAR, Unique)
- `email` (VARCHAR, Unique)
- `password` (TEXT, bcrypt hashed)
- `created_at` (TIMESTAMP)

### Messages Table
- `id` (UUID, Primary Key)  
- `user_id` (UUID, Foreign Key)
- `content` (TEXT)
- `is_bot_message` (BOOLEAN)
- `created_at` (TIMESTAMP)

## Troubleshooting

### Common API Integration Issues

**"API key not valid" Error:**
- Ensure you're using Google AI Studio (not Google Cloud Console)
- Complete the credential setup process
- Select "Application data" for credential type

**"Quota exceeded" with limit: 0:**
- Create a completely new project instead of importing
- Wait 5-10 minutes for new API keys to activate
- Verify free tier is properly enabled

**"Model not found" Error:**
- Use the correct model name: `gemini-2.5-flash-preview-05-20`
- Ensure you're using the v1beta endpoint
- Run ListModels API to verify available models:
```bash
curl "https://generativelanguage.googleapis.com/v1beta/models?key=YOUR_API_KEY"
```

**Database Connection Issues:**
- Verify PostgreSQL is running locally
- Check DATABASE_URL format in .env file
- Ensure database exists and schema is applied

### Environment Setup Checklist

- [ ] PostgreSQL installed and running
- [ ] Database created with schema applied
- [ ] .env file created with valid API key
- [ ] Dependencies installed for both frontend and backend
- [ ] Google AI Studio project created (not imported)
- [ ] API key credential setup completed

## Project Structure

```
ai-chatbot-app/
├── backend/
│   ├── routes/
│   │   ├── auth.js          # Authentication routes
│   │   └── chatbot.js       # AI chat functionality
│   ├── db/
│   │   ├── dbConfig.js      # Database connection
│   │   ├── schema.sql       # Database schema
│   │   └── seed.sql         # Test data
│   ├── app.js               # Express application setup
│   └── .env                 # Environment variables
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Chatbox.jsx   # Main chat interface
    │   │   └── useAuth.jsx   # Authentication hook
    │   └── api.js            # API client functions
    └── package.json
```

## Development Notes

This application demonstrates several key full-stack development concepts:

- **RESTful API Design**: Clean separation between authentication and chat functionality
- **Secure Authentication**: Proper password hashing and session management
- **External API Integration**: Robust error handling for third-party services
- **Database Design**: Normalized schema with proper foreign key relationships
- **Modern React Patterns**: Hooks-based components with custom authentication context
- **Error Handling**: Comprehensive error handling throughout the application stack

## Future Enhancements

- Conversation history retrieval
- Real-time messaging with WebSockets
- User-to-user chat functionality
- Message search and filtering
- Mobile-responsive design improvements
- Deployment configuration

## License

This project is available for educational and portfolio purposes.