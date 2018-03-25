const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const lodash = require('lodash');
const bcrypt = require('bcryptjs');

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
UserSchema.statics.findByCredentials = function (email, password) {
    let User = this;
    return User.findOne({ email }).then((user) => {

        if (!user) {
            return Promise.reject();
        }
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, result) => {

                if (result) {
                    console.log(user);
                    resolve(user);
                }
                else {
                    reject();
                }
            })

        })


    })

}

UserSchema.pre('save', function (next) {
    let user = this;
    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            console.log(salt);
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            })
        })


    } else {
        next();
    }

})
const User = mongoose.model('users', UserSchema);
module.exports = { User };