const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const md5 = require('md5');
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    first_name: {
        type: String,
        trim: true,
        required: [true, 'first name is required']
    },
    last_name: {
        type: String,
        trim: true,
        required: [true, 'last name is required']
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        validate: [validator.isEmail, 'Invalid Email Address'],
        required: [true, 'email is required']
    },
    phone_no: {
        type: String,
        trim: true,
        required: false
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    verificationToken: String,
    isActive: {
        type: Boolean,
        default: false
    },
    privileges: [{
        type: mongoose.Schema.ObjectId,
        ref: "Privilege",
        required: [true, 'User privilege required']
    }]
})

userSchema.virtual('gravatar').get(function() {
    const hash = md5(this.email);
    return `https://gravatar.com/avatar/${hash}?s=200`;
})

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
userSchema.plugin(mongodbErrorHandler);

module.exports =  mongoose.model('User', userSchema)