//const requireOption = require('../requireOption');

/**
 * Deletes the route in res.locals.route. Redirects to '/'
 * @returns
 */
module.exports = () => {
    return (req, res, next) => {
        res.locals.route.remove((err) => {
            if (err) {
                return next(err)
            }
            return res.redirect('/')
        })
    }
}
