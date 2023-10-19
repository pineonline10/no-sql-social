const router = require('express').Router();
const Thought = require('../../models/Thought');  // Import the Thought model

router.get('/thoughts', async (req, res) => {
    try {
      const thoughts = await Thought.find({}).populate('reactions');
      
      if (!thoughts) {
        return res.status(404).json({ message: 'No thoughts found' });
      }

      res.json(thoughts);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while fetching thoughts.' });
    }
});

router.get('/thoughts/:id', async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.id).populate('reactions');
      
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
  
      res.json(thought);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while fetching the thought.' });
    }
  });
  
router.post('/thoughts', async (req, res) => {
    try {
      const newThought = await Thought.create(req.body);
      res.json(newThought);
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: 'Failed to create the thought.' });
    }
  });

  router.put('/thoughts/:id', async (req, res) => {
    try {
      const updatedThought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
      
      if (!updatedThought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
  
      res.json(updatedThought);
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: 'Failed to update the thought.' });
    }
  });
   
  router.delete('/thoughts/:id', async (req, res) => {
    try {
      const deletedThought = await Thought.findByIdAndDelete(req.params.id);
      
      if (!deletedThought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
  
      res.json({ message: 'Thought deleted' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to delete the thought.' });
    }
});

module.exports = router;
