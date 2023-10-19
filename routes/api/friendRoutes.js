const router = require('express').Router();
const User = require('../../models/User');

router.post('/users/:userId/friends/:friendId', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
          req.params.userId, 
          { $addToSet: { friends: req.params.friendId } }, 
          { new: true, runValidators: true }
        );
        
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        
        res.json(user);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while adding the friend.' });
      }
  });
  
router.delete('/users/:userId/friends/:friendId', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
          req.params.userId, 
          { $pull: { friends: req.params.friendId } }, 
          { new: true, runValidators: true }
        );
  
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        
        res.json(user);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while removing the friend.' });
      }
  });
  