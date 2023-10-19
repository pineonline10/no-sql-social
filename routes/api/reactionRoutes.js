const router = require('express').Router();
const Thought = require('../../models/Thought');  // Import the Thought model

router.post('/thoughts/:thoughtId/reactions', async (req, res) => {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $push: { reactions: req.body } },
        { new: true, runValidators: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }

      res.json(thought);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while adding the reaction.' });
    }
});

router.delete('/thoughts/:thoughtId/reactions/:reactionId', async (req, res) => {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $pull: { reactions: { _id: req.params.reactionId } } },
        { new: true, runValidators: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }

      res.json(thought);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while removing the reaction.' });
    }
});

module.exports = router;
