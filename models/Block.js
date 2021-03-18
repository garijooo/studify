const mongoose = require('mongoose');

const BlockSchema = new mongoose.Schema({
    type: String,
    title: String,
    text: String,
    url: String,
    size: String,
    localUrl: String
});

const Block =  mongoose.model('Block', BlockSchema);

exports.Block = Block;
exports.BlockSchema = BlockSchema;