const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const lodash = require('lodash');


let UserSchema = mongoose.Schema({
    email: {
        type: String,
        minlength: 1,
        trim: true,
        required: true,
        unique: true,
        // validate: (value) => {
        //    return validator.isEmail(value)
        // },
        validate: validator.isEmail

        , message: "Value is not an Email"
    }
    ,
    password: {
        type: String,
        minlength: 6,
        required: true

    },
    tokens: [{
        token: {
            type: String,
            required: true
        },
        access: {
            type: String,
            required: true
        }

    }]


})


UserSchema.methods.toJSON = function () {
    let user = this;
    let userObject = user.toObject();
    return userReturn = lodash.pick(userObject, ['email', '_id']);
}

UserSchema.methods.generateAuthTokens = function () {
    let user = this;
    let access = "auth"
    let token = jwt.sign({ id: user._id.toHexString(), access }, "abc123").toString();
    user.tokens = user.tokens.concat([{ token, access }]);
    return user.save().then(() => {
        return token;
    })

}
UserSchema.statics.findByToken = function (token) {
    var User = this;
    var decoded;

    try {
        decoded = jwt.verify(token, 'abc123');
    } catch (e) {
        return Promise.reject();
    }

    return User.findOne({
        '_id': decoded.id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};

const User = mongoose.model('users', UserSchema);
module.exports = { User };