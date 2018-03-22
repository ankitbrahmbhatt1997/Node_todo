let mongoose = require('mongoose');
let user = mongoose.model('users', {
    email: {
        type: String,
        minlength: 1,
        trim: true,
        required: true
    }
})

module.exports = { user };