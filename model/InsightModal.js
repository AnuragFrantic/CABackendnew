const { default: mongoose } = require("mongoose")



const InsightModal = new mongoose.Schema({
    title: { type: String },
    description: { type: String },

}, { timestamps: true })


module.exports = mongoose.model('Insight', InsightModal)