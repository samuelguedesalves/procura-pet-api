const mongoose = require('../database/index');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    phone: {
        type: String,
        required: true,
    },
    localization: {
        type: String,
        required: true,
    }
});

UserSchema.pre('save', async function(next){
    const hash = await bcrypt.hash( this.password, 10);
    this.password = hash;
    
    next();
})

const User = mongoose.model('User', UserSchema);

module.exports = User;