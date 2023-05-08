//const requireOption = require('../requireOption');

/**
 * Gets all the routes from the databse and stores it in res.locals.routes
 * @param {*} objectrepository
 * @returns
 */
module.exports = or => {
    return (req, res, next) => {
        return or.RouteModel.find({}, (err, routes) => {
            if (err) {
                return next(err)
            }
            res.locals.routes = routes.map(route => route.toObject())
            return next();
        })
    };
};