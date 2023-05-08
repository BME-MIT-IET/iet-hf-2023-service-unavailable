const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/GJ8J3A', { useNewUrlParser: true });

module.exports = mongoose;