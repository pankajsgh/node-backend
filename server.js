const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Backend Working');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

app.get('/users', (req, res) => {
  res.json([
    {
      id: 1,
      name: 'Pankaj'
    },
    {
      id: 2,
      name: 'Rohit'
    }
  ]);
  
});


app.use(express.json());

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  res.json({
    success: true,
    email: email
  });
});