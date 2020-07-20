const mongoose = require('mongoose');
require('dotenv').config();
const db = mongoose.createConnection(process.env.MONGO_URI, {
    useNewUrlParser: true
});


const authSchema = mongoose.Schema({
    username: 'string',
    password: 'string'
});

authSchema.methods.validPassword = function (pwd) {
    console.log(pwd);
    return (this.password === pwd);
};

const User = db.model('user', authSchema, 'user');
module.exports = {
    User: User
};