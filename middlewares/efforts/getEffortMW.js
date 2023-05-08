//const requireOption = require('../requireOption');

/**
 * Gets the effort with id=:effort_id and stores it in res.locals.effort
 * @param {*} or
 * @returns
 */
module.exports = or => {
    return (req, res, next) => {
        return or.EffortModel.findOne({ _id: req.params.effort_id }, (err, effort) => {
            if (err) {
                return next(err)
            }
            res.locals.effort = effort
            return next();
        })
    };
};