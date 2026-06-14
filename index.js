const express = require('express');
const app = express();
const db = require('./db'); // MySQL connection

app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Backend is running 🚀');
});

// Test DB route
app.get('/test-db', (req, res) => {
  db.query('SELECT 1', (err, result) => {
    if (err) {
      return res.send('DB Error ❌');
    }
    res.send('DB Connected Successfully ✅');
  });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});