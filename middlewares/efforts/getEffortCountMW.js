//const requireOption = require('../requireOption');

/**
 * Gets the number of efforts for every route in res.locals.routes and sorts it based on the number of efforts.
 * @param {*} or
 * @returns
 */
 module.exports = or => {
    return (req, res, next) => {
        res.locals.title = "Útvonalmegosztó"
        Promise.all(res.locals.routes.map(route => (
            or.EffortModel.count({ _route: route._id}).exec()
        )))
        .then(values => {
            res.locals.routes.forEach((route, idx) => {
                route.efforts = values[idx]
            })
            res.locals.routes.sort((firstE, secondE) => {
                return secondE.efforts - firstE.efforts
            })
            return next();
        })
        .catch(err => {
            return next(err)
        })
    };
};