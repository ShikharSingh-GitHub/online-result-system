const mongoose = require('mongoose');

mongoose.connect('mongodb://mongo:27017/testexpress');

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error('Connection error: ', err);
});

module.exports = mongoose;