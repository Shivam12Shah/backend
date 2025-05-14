const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (email) => /^[^s@]+@[^s@]+.[^s@]+$/.test(email),
            message: "Please enter a valid email address"
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
    }
},{
    timestamps: true
})

module.exports = mongoose.model("User", userSchema)