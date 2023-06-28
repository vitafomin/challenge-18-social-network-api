const { Schema, model } = require("mongoose");

const userSchema = new Schema(
    {
       username: {
        type: String,
        unique: true,
        required: true,
        trimmed: true
       } ,
       email: {
        type: String,
        required: true,
        unique: true,
        match: [/"[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}"/i.test(v)]
       },
       thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Thought"
        },
       ],
       friends: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
       ],
    },
);

userSchema.virtual("friendCount").get(function () {
    return this.friends.length;
});

const User = model("user", userSchema);

module.exports = User;
