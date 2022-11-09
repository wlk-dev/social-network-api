const { ObjectId } = require('mongoose').Types;
const { User } = require('../models');


module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find()
            res.status(200).json(users)

        } catch(err) {
            console.trace(err);
            res.status(500).json(err)
        }
    },

}