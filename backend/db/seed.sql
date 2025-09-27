INSERT INTO users (username, email, password)
VALUES
  ('testuser1', 'test1@example.com', 'securepass1'),
  ('testuser2', 'test2@example.com', 'securepass2'),
  ('AI_BOT', 'bot@example.com', 'securepass3')
  ON CONFLICT (username) DO NOTHING;

