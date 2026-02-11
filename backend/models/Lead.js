const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        default: ""
    },
    company: {
        type: String,
        default: ""
    },
    source: {
        type: String,
        default: "Website"
    },
    status: {
        type: String,
        enum: ["New", "Contacted", "Qualified", "Converted", "Lost"],
        default: "New"
    },
    priority: {
        type: String,
        enum: ["Low", "Medium", "High"],
        default: "Medium"
    },
    notes: {
        type: String,
        default: ""
    },
    followUpDate: {
        type: Date
    }
}, { 
    timestamps: true 
});

module.exports = mongoose.model("Lead", leadSchema);