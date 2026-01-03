// model/ContactSchema.js
const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    type: {
        type: String,
        required: true,
        enum: ['query', 'feedback', 'support', 'other', 'carrer'],
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function (v) {

                return /^\S+@\S+\.\S+$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    mobile: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function (v) {
                // Simple mobile number validation (adjust according to your requirements)
                return /^\d{10,15}$/.test(v); // Allows mobile numbers of 10 to 15 digits
            },
            message: props => `${props.value} is not a valid mobile number!`
        }
    },
    image: {
        type: String,
        // required: true
    },
    icon: {
        type: String,
    },
    qualification: { type: String },
    experience: { type: String },

    message: {
        type: String,

        trim: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

// Export the model
module.exports = mongoose.model('Contact', ContactSchema);
