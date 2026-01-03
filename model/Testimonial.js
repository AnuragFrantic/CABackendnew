const mongoose = require('mongoose')


const TestimonialSchema = new mongoose.Schema({
    title: { type: String },
    post: { type: String },
    image: { type: String },
    description: { type: String }
}, { timestamps: true })

module.exports = mongoose.model("Testimonial", TestimonialSchema)

