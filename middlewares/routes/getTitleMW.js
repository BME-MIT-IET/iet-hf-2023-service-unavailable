//const requireOption = require('../requireOption');

/**
 * Decides the title of the next html page
 * @param {*} objectrepository
 * @returns
 */
 module.exports = objectrepository => {
    return (req, res, next) => {
        if (typeof(res.locals.route) !== 'undefined') {
            res.locals.title = "Útvonalmegosztó - Útvonal szerkesztése"
        } else {
            res.locals.title = "Útvonalmegosztó - Új útvonal"
        }
        return next();
    };
};