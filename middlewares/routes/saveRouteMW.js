//const requireOption = require('../requireOption');

/**
 * If method is GET, it does nothing.
 * Otherwise it saves or updates a route with POST parameters. If res.locals.route exists, it's an update, otherwise it's creation.
 * If the params are okay, redirects to the newly created/updated route, otherwise stores errors in res.locals.errors.
 * @param {*} objectrepository
 * @returns
 */
module.exports = objectrepository => {
    return (req, res, next) => {
        if (req.method === "POST") {
            if (req.body.name.trim() === '') {
                (res.locals.errors = res.locals.errors || []).push('Adj nevet az útvonalnak!')
            } if (req.body.distance.trim() === '') {
                (res.locals.errors = res.locals.errors || []).push('Add meg az útvonal hosszát!')
            } if (req.body.elevation.trim() === '') {
                (res.locals.errors = res.locals.errors || []).push('Add meg az útvonal szintemelkedését!')
            } if (req.body.link.trim() === '') {
                (res.locals.errors = res.locals.errors || []).push('Add meg az útvonal linkjét!')
            } if (Number.isNaN(parseFloat(req.body.distance))) {
                (res.locals.errors = res.locals.errors || []).push('Az útvonal hosszának számnak kell lennie!')
            } if (Number.isNaN(parseInt(req.body.elevation))) {
                (res.locals.errors = res.locals.errors || []).push('Az útvonal szintemelkedésének egész számnak kell lennie!')
            } if (!req.body.link.startsWith('https://')) {
                (res.locals.errors = res.locals.errors || []).push('Érvénytelen link!')
            }
            if (typeof res.locals.errors !== "undefined") {
                return next()
            }

            const newRoute = res.locals.route ? res.locals.route : new objectrepository.RouteModel()
            newRoute.name = req.body.name
            newRoute.distance = req.body.distance
            newRoute.elevation = req.body.elevation
            newRoute.link = req.body.link

            return newRoute.save(err => {
                if (err) {
                    return next(err)
                }
                return res.redirect(`/routes/show/${newRoute._id}`)
            })
        }
        return next()
    };
};