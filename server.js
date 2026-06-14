const express = require('express');
const app = express();

app.use(express.json());

// Home route
app.get('/', (req, res) => {
  res.send('Backend Working');
});

// Users API
app.get('/users', (req, res) => {
  res.json([
    { id: 1, name: 'Pankaj' },
    { id: 2, name: 'Rohit' }
  ]);
});

// Login API
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  res.json({
    success: true,
    email: email
  });
});

// PORT for Render
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});