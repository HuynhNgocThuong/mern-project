const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create models
const PostSchema = new Schema({
    title:{
        type: String,
        require: true
    },
    description: {
        type: String,
    },
    url: {
        type: String,
    },
    status: {
        type: String,
        enum: ['TO LEARN', 'LEARNING', 'LEARNED']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});

module.exports = mongoose.model('posts', PostSchema);