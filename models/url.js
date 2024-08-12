const { Schema, model } = require("mongoose");

const urlSchema = new Schema({
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    shortId: {
        type: String,
        required: true,
        unique: true,
    },
    redirectURL: {
        type: String,
        required: true
    },
    visitHistory: [{
        timestamp: {
            type: Number
        }
    }]
}, {
    timestamps: true,
})

const URL = model("url", urlSchema);

module.exports = URL;