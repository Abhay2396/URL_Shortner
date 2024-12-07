import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        unique: true,
        required: true,
    },
    redirectURL: {
        type: String,
        required: true,
    },
    visitHistory: [{ timestamp: { type: Number } }],
}, { timestamp: true });

const URL = mongoose.model('url', urlSchema);

export default URL;