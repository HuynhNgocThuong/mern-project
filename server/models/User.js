const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create model
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    createAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('users', UserSchema);