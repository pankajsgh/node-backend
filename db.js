const mysql = require('mysql2');

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '1234567',
  database: 'backend_db'
});

db.connect((err) => {
  if (err) {
    console.log('❌ MySQL Error:', err.code);
    console.log('Message:', err.message);
  } else {
    console.log('✅ MySQL Connected');
  }
});

module.exports = db;