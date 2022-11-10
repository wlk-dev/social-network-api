const { Thought, User } = require('../models');


module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.status(200).json(thoughts)

        } catch (err) {
            console.trace(err);
            res.status(500).json(err);
        }
    },

    async getThoughtById(req, res) {
        const id = req.params.id;
        try {
            const thought = await Thought.findOne({ _id: id })
            thought ? res.status(200).json(thought) : res.status(404).json({ msg: `No thought with ID '${id}'` })

        } catch (err) {
            console.trace(err);
            res.status(500).json(err);
        }
    },

    async createThought(req, res) {
        try {
            const newThought = await Thought.create(req.body)

            newThought ? res.status(200).json(newThought) : res.status(400).json({ msg: 'Malformed request body.' })

            await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: { _id: newThought._id } } },
                { runValidators: true }
            )

        } catch (err) {
            console.trace(err);
            res.status(500).json(err);
        }
    },

    async updateThought(req, res) {
        const id = req.params.id;
        try {
            const updThought = await Thought.findOneAndUpdate(
                { _id: id },
                { $set: req.body },
                { runValidators: true, new: true }
            )

            updThought ? res.status(200).json(updThought) : res.status(404).json({ msg: `No thought with ID '${id}'` })


        } catch (err) {
            console.trace(err);
            res.status(500).json(err);
        }
    },

    async removeThought(req, res) {
        const id = req.params.id;
        try {
            const delThought = await Thought.findOneAndDelete({ _id: id })

            delThought ? res.status(200).json(delThought) : res.status(404).json({ msg: `No thought with ID '${id}'` })

        } catch (err) {
            console.trace(err);
            res.status(500).json(err);
        }
    },

    async addReaction(req, res) {
        const id = req.params.id;
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: id },
                { $push: { reactions: req.body } },
                { runValidators: true, new: true }
            )

            thought ? res.status(200).json(thought) : res.status(404).json({ msg: `No thought with ID '${id}'` })

        } catch (err) {
            console.trace(err);
            res.status(500).json(err);
        }
    },

    async removeReaction(req, res) {
        const id = req.params.id
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: id },
                { $pull: { reactions: { reactionId: req.body.reactionId } } },
                { runValidators: true, new: true }
            )

            thought ? res.status(200).json(thought) : res.status(404).json({ msg: `No thought with ID '${id}'` })

        } catch (err) {
            console.trace(err);
            res.status(500).json(err);
        }

    }
}