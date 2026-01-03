const mongoose = require('mongoose')


const Profile = new mongoose.Schema({
    title: { type: String },
    para: { type: String },
    image: { type: String }
}, { timestamps: true })

module.exports = mongoose.model("Profile", Profile)

