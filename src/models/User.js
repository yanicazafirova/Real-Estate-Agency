const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { SALT_ROUNDS } = require('../constants');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Fullname is required!'],
        validate: {
            validator: function (value) {
                return /[A-Z][a-z]+\s[A-Z][a-z]+/.test(value);
            },
            message: props => `${props.value} is not a valid fullname!`,
        }
    },
    username: {
        type: String,
        required: [true, 'Username is required!'],
        minLength: [5, 'Username is too short!'],
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        minLength: [4, 'Password should be a minimum of 4 characters long!'],
    },
});

userSchema.pre('save', function (next) {
    bcrypt.hash(this.password, SALT_ROUNDS)
        .then(hash => {
            this.password = hash;

            next();
        });
});

userSchema.method('validatePassword', function (password) {
    return bcrypt.compare(password, this.password);
});

const User = mongoose.model('User', userSchema);

module.exports = User;