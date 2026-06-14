const express = require('express');
const app = express();

const db = require('./db'); // 👈 connect DB file

app.use(express.json());

// Home route
app.get('/', (req, res) => {
  res.send('Backend Working');
});

// GET users from MySQL (THIS IS YOUR ANSWER)
app.get('/users', (req, res) => {

  const sql = "SELECT * FROM users";

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }

    res.json(results);
  });

});

// PORT
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});