/**
 * Renders the given template with the parameters in res.locals
 * @param {*} template filename of the template in /views
 * @returns
 */
module.exports = (template, objRepo) => {
    return (req, res) => {
        res.render(template, res.locals)
    }
}