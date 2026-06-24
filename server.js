const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer');

const db = require('./db');
const employee = require('./employee'); // 👈 import file
const uploadDoc = require('./doc-upload'); // 👈 import file

app.use(cors());
app.use(express.json());

// Home
app.get('/', (req, res) => {
  res.send('Backend Working 🚀');
});

// USERS (keep here simple)
app.get('/api/users', (req, res) => {
  const sql = "SELECT * FROM users";

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});


// 👉 EMPLOYEE APIs moved to separate file
app.get('/api/employees', employee.getEmployees);
app.post('/api/employees', employee.createEmployee);

app.post(
  '/api/doc-upload',
  upload.single('file'),
  uploadDoc.uploadDocument
);

// Server start
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});