//const requireOption = require('../requireOption');

/**
 * Deletes all efforts stored in res.locals.efforts (separately by sports)
 * @param {*} or
 * @returns
 */
module.exports = or => {
    return (req, res, next) => {
        or.EffortModel.deleteMany({_route: res.locals.route._id}, err => {
            if (err) {
                return next(err)
            }
            return next();
        })
    };
};