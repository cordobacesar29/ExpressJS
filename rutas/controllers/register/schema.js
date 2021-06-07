const mongoose = require("mongoose");
const { Schema } = mongoose;

const registerSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        repository: {
            type: String,
            required: true,
        },
        webSite: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("register", registerSchema);