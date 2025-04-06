const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const users = [{email: 'admin@example.com', password: '123456'}];

const createToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};

// Реєстрація
router.post('/register', (req, res) => {
  const { email, password } = req.body;
  const user = { id: Date.now(), email, password };
  users.push(user);
  const token = createToken(user);
  res.cookie('token', token, { httpOnly: true });
  res.redirect('/protected');
});

// Вхід
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).send('Invalid credentials');
  const token = createToken(user);
  res.cookie('token', token, { httpOnly: true });
  res.redirect('/protected');
});

router.get('/login', (req, res) => {
  res.render('login');
});

module.exports = router;
