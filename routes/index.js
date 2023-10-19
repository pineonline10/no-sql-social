const router = require('express').Router();

const friendRoutes = require('./api/friendRoutes');
const reactionRoutes = require('./api/reactionRoutes');
const thoughtRoutes = require('./api/thoughtRoutes');
const userRoutes = require('./api/userRoutes');

router.use('/api/users', userRoutes);
router.use('/api/users', friendRoutes);
router.use('/api/thoughts', thoughtRoutes);
router.use('/api/thoughts', reactionRoutes);

module.exports = router;
