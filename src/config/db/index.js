const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/BlueMoon');
        console.log('Connect database succssfully!');
    } catch (error) {
        console.log('Connect database faillure!');
    }
}

module.exports = { connect };