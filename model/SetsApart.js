const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SetsapartSchema = new Schema({
    image: {
        type: String,  
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },

}, { timestamps: true });

module.exports = mongoose.model('Setsapart', SetsapartSchema);
