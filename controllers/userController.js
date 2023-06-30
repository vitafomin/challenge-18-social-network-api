const { User, Thought, Reaction } = require("../models");

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find();

            res.json(users)
        }
        catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })

            if (!user) {
                return res.status(404).json({ message: "User Not Found!" })
            }
            res.json({ user, friends, thoughts });
        }
        catch (err) {
            console.log(err);
            return res.status(500).json(err); 
        }
    },

    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },

    async updateUser(req, res) {
        try {
            const newUser = await User.findOneAndUpdate({ user: req.params.userId }, {new: true });

            res.json(newUser)
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err)
        }
    },

    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndRemove({ _id: req.params.userId });
            res.json({ user, message: "User Deleted" });
        }    
        catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },

    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.body } }, {runValidators: true, new: true });
            res.json(user);
        }
        catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    },

    async deleteFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friend: { friendId: req.params.friendId } } }, { runValidators: true, new: true });
            res.json(user);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
};