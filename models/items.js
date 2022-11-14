const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

const Item = mongoose.model('Item', itemSchema);

const listSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    items: [itemSchema]
});

const List = mongoose.model('List', listSchema);

module.exports = { Item, List };
// console.log(module.exports)