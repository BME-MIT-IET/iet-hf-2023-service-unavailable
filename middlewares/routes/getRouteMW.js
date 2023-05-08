//const requireOption = require('../requireOption');

/**
 * Gets the route with id=:route_id and stores it in res.locals.route
 * @param {*} or
 * @returns
 */
 module.exports = or => {
    return (req, res, next) => {
        return or.RouteModel.findOne({ _id: req.params.route_id}, (err, route) => {
            if (err) {
                return next(err)
            }
            res.locals.route = route
            return next();
        })
    };
};