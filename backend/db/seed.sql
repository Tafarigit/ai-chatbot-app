-- Insert sample users
INSERT INTO users (username, email, password)
VALUES 
  ('testuser1', 'test1@example.com', 'securepass1'),
  ('testuser2', 'test2@example.com', 'securepass2');

-- Insert sample messages
INSERT INTO messages (user_id, message)
VALUES 
  ((SELECT id FROM users LIMIT 1), 'Hello, I am an AI chatbot.'),
  ((SELECT id FROM users LIMIT 1 OFFSET 1), 'Hi there! How can I assist you today?');
