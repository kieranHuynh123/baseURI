const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const metadata = new Schema({
    filename: String,
    url: String,
    createdAt: Date
});

module.exports=mongoose.model('metadata',metadata)