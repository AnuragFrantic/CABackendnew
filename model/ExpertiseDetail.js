const mongoose = require('mongoose');
const slugify = require('slugify'); // Import the slugify package
const Schema = mongoose.Schema;

// Schema for Expertise Details
const ExpertiseDetailSchema = new Schema({
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
    details: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String, // This could be a URL or a path to the uploaded image
        // required: true
    },
    url: {
        type: String,

        unique: true,
        lowercase: true
    }
}, { timestamps: true });

// Pre-save hook to generate a unique URL
ExpertiseDetailSchema.pre('save', function (next) {
    // Generate a slug from the title if it exists
    if (this.title) {
        // Generate a slug and set it to the url field
        this.url = slugify(this.title, { lower: true, strict: true });
    }
    next();
});

// Post-save hook to ensure URL uniqueness
ExpertiseDetailSchema.post('save', async function (doc, next) {
    try {
        const existingDoc = await mongoose.models.ExpertiseDetail.findOne({ url: this.url });
        if (existingDoc && existingDoc._id.toString() !== doc._id.toString()) {
            // If a document with the same URL exists, generate a new unique URL
            this.url = `${this.url}-${Date.now()}`; // Append timestamp for uniqueness
            await this.save(); // Save the updated document
        }
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('ExpertiseDetail', ExpertiseDetailSchema);
