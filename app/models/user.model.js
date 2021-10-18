const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    firstName: String,
    email: String,
    phoneNumber: String,
    age: Number,
    addressLine1: String,
    addressLine2: String,
    status:String,
    isActive:{ type: Boolean, default: true },
    role:String
}, {
    timestamps: true
});

module.exports = mongoose.model('Note', UserSchema);