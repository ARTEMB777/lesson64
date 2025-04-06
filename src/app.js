const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Статичні файли
app.use(express.static(path.join(__dirname, 'public')));

// EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
const authRoutes = require('./routes/auth');
const themeRoutes = require('./routes/theme');
const authenticate = require('./middleware/authMiddleware');

app.use('/', authRoutes);
app.use('/', themeRoutes);

app.get('/', (req, res) => {
  const theme = req.cookies.theme || 'light';
  res.render('index', { theme });
});

app.get('/protected', authenticate, (req, res) => {
  res.render('protected', { user: req.user });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
