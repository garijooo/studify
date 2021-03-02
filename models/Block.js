const mongoose = require('mongoose');

const BlockSchema = new mongoose.Schema({
    order: Number,
    type: String,
    title: String,
    text: String,
    url: String
});

const Block =  mongoose.model('Block', BlockSchema);

exports.Block = Block;
exports.BlockSchema = BlockSchema;