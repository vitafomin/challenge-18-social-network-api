const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction")

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 250,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (date) => {timeSince(date)} 
        },
        username: {
            required: true,
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        timestamps: true,
    }
);

thoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length
});

const Thought = model("thought", thoughtSchema);

module.exports = Thought;