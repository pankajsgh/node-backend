const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'gateway01.ap-southeast-1.prod.alicloud.tidbcloud.com',
  user: '45iBUQpXhubjd2V.root',
  password: 'zu4NBfNLDZJ1FNOL',
  database: 'test',
  port: 4000,
  ssl: {
    rejectUnauthorized: true
  }
});

db.connect((err) => {
  if (err) {
    console.log('❌ DB Error:', err.message);
  } else {
    console.log('✅ MySQL Connected');
  }
});

module.exports = db;