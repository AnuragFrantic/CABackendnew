



const mongoose = require('mongoose');
const slugify = require('slugify');

const legalupdate = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        // required: true
    },
    image: {
        type: String,
        required: true
    },
    icon: {
        type: String,
    },
    url: {
        type: String,
        unique: true,
        lowercase: true
    }
}, { timestamps: true });

// Pre-save hook to generate unique URL from title
legalupdate.pre('save', function (next) {
    if (this.isModified('title') || this.isNew) {
        this.url = slugify(this.title, { lower: true, strict: true });
    }
    next();
});


const LegalUpdate = mongoose.model('legalUpdate', legalupdate);

module.exports = LegalUpdate;
