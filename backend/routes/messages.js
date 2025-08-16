const express = require("express");
const router = express.Router();
const pool = require("../db/dbConfig");

// Get all messages (optionally filtered by sender or receiver)
router.get("/", async (req, res) => {
  const { sender_id, receiver_id } = req.query;
  try {
    let query = "SELECT * FROM messages";
    const params = [];

    if (sender_id || receiver_id) {
      query += " WHERE";
      if (sender_id) {
        params.push(sender_id);
        query += ` sender_id = $${params.length}`;
      }
      if (receiver_id) {
        if (params.length) query += " AND";
        params.push(receiver_id);
        query += ` receiver_id = $${params.length}`;
      }
    }

    query += " ORDER BY created_at DESC";

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error fetching messages" });
  }
});

// Get a message by ID
router.get("/:id", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM messages WHERE id = $1",
      [req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: "Message not found" });
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error fetching message" });
  }
});

// Create a new message
router.post("/", async (req, res) => {
  const { sender_id, receiver_id, content } = req.body;
  try {
    if (!sender_id || !receiver_id || !content) {
      return res.status(400).json({ error: "sender_id, receiver_id, and content are required" });
    }
    const result = await pool.query(
      `INSERT INTO messages (sender_id, receiver_id, content)
       VALUES ($1, $2, $3) RETURNING *`,
      [sender_id, receiver_id, content]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error creating message" });
  }
});

// Update a message content
router.put("/:id", async (req, res) => {
  const { content } = req.body;
  try {
    if (!content) return res.status(400).json({ error: "Content is required" });

    const result = await pool.query(
      `UPDATE messages SET content = $1, updated_at = NOW()
       WHERE id = $2 RETURNING *`,
      [content, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: "Message not found" });

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error updating message" });
  }
});

// Delete a message
router.delete("/:id", async (req, res) => {
  try {
    const result = await pool.query(
      "DELETE FROM messages WHERE id = $1 RETURNING *",
      [req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: "Message not found" });

    res.json({ message: "Message deleted", messageData: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error deleting message" });
  }
});

module.exports = router;
