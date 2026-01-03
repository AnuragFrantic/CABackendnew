const { default: mongoose } = require("mongoose")



const ProBono = new mongoose.Schema({
    title: { type: String },
    description: { type: String },

}, { timestamps: true })


module.exports = mongoose.model('ProBono', ProBono)