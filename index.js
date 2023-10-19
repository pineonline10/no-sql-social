const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/api/userRoutes');
const friendRoutes = require('./routes/api/friendRoutes');
const reactionRoutes = require('./routes/api/reactionRoutes');
const thoughtRoutes = require('./routes/api/thoughtRoutes');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3001;

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/socialNetwork', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/users', friendRoutes);
app.use('/api/thoughts', thoughtRoutes);
app.use('/api/thoughts', reactionRoutes);

// General error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
