const express = require('express');
const router = express.Router();

router.post('/theme', (req, res) => {
  const { theme } = req.body;
  res.cookie('theme', theme, { maxAge: 7 * 24 * 60 * 60 * 1000 });
  res.redirect('/');
});

module.exports = router;
