const router = require('express').Router();
const User = require('../../models/User');

router.get('/', async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch users.' });
    }
});

router.get('/:id', async (req, res) => {
    try {
      console.log("Requested ID:", req.params.id);
        const user = await User.findById(req.params.id).populate('thoughts').populate('friends');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch user.' });
    }
});

router.post('/', async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.json(newUser);
    } catch (err) {
        res.status(400).json({ error: 'Failed to create user.' });
    }
});

router.put('/:id', async (req, res) => {
  try {
    console.log('Updating user with ID: ', req.params.id);
    console.log('Update data:', req.body);
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json(updatedUser);
} catch (err) {
    res.status(400).json({ error: 'Failed to update user.' });
}
});

router.delete('/:id', async (req, res) => {
try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted' });
} catch (err) {
    res.status(500).json({ error: 'Failed to delete user.' });
}
});

router.post('/:userId/friends/:friendId', async (req, res) => {
    console.log('POST request received');
    console.log('UserID:', req.params.userId);
    console.log('FriendID:', req.params.friendId);
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

router.delete('/:userId/friends/:friendId', async (req, res) => {
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

module.exports = router;

