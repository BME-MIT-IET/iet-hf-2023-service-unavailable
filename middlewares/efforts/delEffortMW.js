//const requireOption = require('../requireOption');

/**
 * Deletes the effort in res.locals.effort and redirects to the route's page.
 * @returns
 */
module.exports = () => {
    return (req, res, next) => {
        res.locals.effort.remove((err) => {
            if (err) {
                return next(err)
            }
            return res.redirect(`/routes/show/${res.locals.route._id}`)
        })
    }
}
