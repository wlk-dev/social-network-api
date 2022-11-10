const { ObjectId } = require('mongoose').Types;
const { User } = require('../models');


module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find()
            res.status(200).json(users)

        } catch (err) {
            console.trace(err);
            res.status(500).json(err)
        }
    },

    async getUserById(req, res) {
        const id = req.params.id
        try {
            const user = await User.findOne({ _id: id });
            user ? res.status(200).json(user) : res.status(404).json({ msg: `No user with ID '${id}'` })

        } catch (err) {
            console.trace(err)
            res.status(500).json(err)
        }
    },

    async createUser(req, res) {
        try {
            const newUser = await User.create(req.body);

            newUser ? res.status(200).json(newUser) : res.status(400).json({ msg: "Malformed request body." })

        } catch (err) {
            console.trace(err)
            res.status(500).json(err)
        }
    },

    async deleteUser(req, res) {
        const id = req.params.id
        try {
            const delUser = await User.findOneAndDelete({ _id: id })

            delUser ? res.status(200).json(delUser) : res.status(404).json({ msg: `No user with ID '${id}'` })

        } catch (err) {
            console.trace(err)
            res.status(500).json(err)
        }
    },

    async updateUser(req, res) {
        const id = req.params.id
        try {
            const updUser = await User.findOneAndUpdate(
                { _id: id },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            updUser ? res.status(200).json(updUser) : res.status(404).json({ msg: `No user with ID '${id}'` })

        } catch (err) {
            console.trace(err)
            res.status(500).json(err)
        }
    },

    async addFriend(req, res) {
        const { id, friendId } = req.params;
        try {
            const user = await User.findOneAndUpdate(
                { _id: id },
                { $addToSet: { friends: { _id: friendId } } },
                { runValidators: true, new: true }
            );

            user ? res.status(200).json(user) : res.status(404).json({ msg: `No user with ID '${id}'` })

        } catch (err) {
            console.trace(err)
            res.status(500).json(err)
        }
    },

    async removeFriend(req, res) {
        const { id, friendId } = req.params;
        try {
            const user = await User.findOneAndUpdate(
                { _id: id },
                { $pull: { friends: friendId } },
                { runValidators: true, new: true }

            )

            user ? res.status(200).json(user) : res.status(404).json({ msg: `No user with ID '${id}'` })

        } catch (err) {
            console.trace(err)
            res.status(500).json(err)
        }
    }

}