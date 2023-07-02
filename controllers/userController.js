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
               .select("-__v").populate({ path: "thoughts" })
            //    .populate('thoughts')

            if (!user) {
                return res.status(404).json({ message: "User Not Found!" })
            }
            console.log("User: ", user)
            res.json(user);
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
            const newUser = await User.findOneAndUpdate({ _id: req.params.userId }, { $set: req.body}, {new: true });

            console.log("User: ", newUser);
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
            res.json({ user, message: "User Deleted!" });
        }    
        catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },

    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate({ _id: req.params.userId }, { $set: req.body }, { new: true });
            res.json(user);
        }
        catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    },

    async deleteFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendsId } }, { runValidators: true, new: true });
            res.json(user);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
};