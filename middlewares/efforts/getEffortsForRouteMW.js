//const requireOption = require('../requireOption');

/**
 * Gets all the efforts that belong to res.locals.route, ordered by time in ascending order and stores them in res.locals, separately by sport.
 * @param {*} or
 * @returns
 */
module.exports = or => {
    return (req, res, next) => {
        res.locals.title = "Útvonalmegosztó - " + res.locals.route.name
        return or.EffortModel.find({ _route: res.locals.route._id }).sort({ time: 'asc'}).exec((err, efforts) => {
            if (err) {
                return next(err)
            }
            res.locals.efforts = {
                hiking: efforts.filter(effort => effort.type === 1),
                running: efforts.filter(effort => effort.type === 2),
                cycling: efforts.filter(effort => effort.type === 3)
            }
            return next();
        })
    };
};