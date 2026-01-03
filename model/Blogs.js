// model/MySchema.js
const mongoose = require('mongoose');
const slugify = require('slugify');

const BlogsSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    short_description: {
        type: String,
    },
    image: {
        type: String,
        required: true,
    },
    publish_date: {
        type: String
    },
    url: {
        type: String,
        unique: true, // Ensures that each slug is unique
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

// Middleware to create a slug before saving the document
// BlogsSchema.pre('save', function (next) {
//     if (this.isModified('title') || this.isNew) {
//         // Generate slug based on the title
//         this.url = slugify(this.title, { lower: true });
//     }
//     next();
// });

// Export the model
module.exports = mongoose.model('Blogs', BlogsSchema);
