// The routes for the thoughts routes
const { User, Thought, Reaction } = require("../models");

module.exports = {
// Here were are getting all the thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();

      res.json(thoughts);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

// Here we are getting a single thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });

      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

// Here we are creating a thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      console.log(thought);

      const updateUser = await User.findOneAndUpdate(
        { username: req.body.username },
        { $push: { thoughts: thought } }
      );

      res.json(updateUser);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

// Here we are updating a thought
  async updateThought(req, res) {
    try {
      const newThought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { new: true }
      );
      res.json(newThought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

// Here we are deleting a thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndRemove({
        _id: req.params.thoughtId,
      });
      res.json({ thought, message: "Thought Deleted!" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

// Here we are creating a reaction
  async createReaction(req, res) {
    try {
      const reaction = req.body;
      console.log(req.body);
        // Pushing the created reaction into the thoughts model
      const newReaction = await Thought.findOneAndUpdate(
        { username: req.body.username },
        { $addToSet: { reactions: reaction } },
        { new: true }
      );

      res.json(newReaction);
      console.log("reaction added");
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

// Here we are deleting a reaction
  async deleteReaction(req, res) {
    try {
      const reaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { _id: req.params.reactionId } } },
        { runValidators: true },
        { new: true }
      );

      res.json(reaction);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
