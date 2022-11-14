const mongoose = require('mongoose');
const { Schema } = mongoose;

const workSchema = new Schema({
    name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Work', workSchema);