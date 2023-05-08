const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Route = db.model('Route', {
    name: String,
    link: String,
    distance: Number,
    elevation: Number
});

module.exports = Route;