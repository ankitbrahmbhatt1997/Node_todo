let mongoose = require('mongoose');
let User = mongoose.model('users', {
    email: {
        type: String,
        minlength: 1,
        trim: true,
        required: true
    }
})

module.exports = { User };