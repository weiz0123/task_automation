// index.js
const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const { Pool } = require('pg');

const app = express();
app.use(express.json());
app.use(cors());

// Setup PostgreSQL connection
const pool = new Pool({
  user: 'your-username',
  host: 'localhost',
  database: 'your-database-name',
  password: 'your-password',
  port: 5432,
});

// Example route using UUID and PostgreSQL
app.get('/', async (req, res) => {
  const id = uuidv4();
  const client = await pool.connect();

  try {
    const result = await client.query('SELECT NOW()');
    res.json({ id, time: result.rows[0].now });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching time from the database');
  } finally {
    client.release();
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
