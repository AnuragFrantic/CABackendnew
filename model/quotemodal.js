const { default: mongoose } = require("mongoose")



const quoteSchema = new mongoose.Schema({
    quotes: { type: String },
    objective: { type: String },
    purpose: { type: String }
}, { timestamps: true })


module.exports = mongoose.model('Quotes', quoteSchema)