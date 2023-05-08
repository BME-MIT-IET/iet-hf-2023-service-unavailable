//const requireOption = require('../requireOption');

/**
 * Saves or updates an effort with POST parameters. If res.locals.effort exists, it's an update, otherwise it's creation.
 * Returns a JSON indicating success or failure.
 * @param {*} or
 * @returns
 */
module.exports = or => {
    return (req, res, next) => {
        const errors = []
        if (req.body.name.trim() === '') {
            errors.push('Add meg a teljesítő nevét!')
        } if (req.body.time.trim() === '') {
            errors.push('Add meg a teljesítés időtartamát!')
        } else if (req.body.time.split(":").length !== 3) {
            errors.push("Érvénytelen időformátum! Helyesen: óó:pp:mm")
        } else {
            req.body.time.split(":").forEach(n => {
                if (Number.isNaN(parseInt(n))) {
                    errors.push('Érvénytelen óra, perc vagy másodperc!')
                }
            })
        } if (Number.isNaN(parseInt(req.body.type))) {
            errors.push('Érvénytelen teljesítési mód!')
        } else if (req.body.type < 1 || req.body.type > 3) {
            errors.push('Érvénytelen teljesítési mód!')
        }

        if (errors.length > 0) {
            return res.status(400).json({errors: errors})
        }

        const newEffort = res.locals.effort ? res.locals.effort : new or.EffortModel()

        newEffort.name = req.body.name.trim()
        const [hour, min, sec] = req.body.time.split(":")
        newEffort.time = `${hour.padStart(2, '0')}:${min.padStart(2, '0')}:${sec.padStart(2, '0')}`
        newEffort.type = req.body.type
        newEffort._route = res.locals.route._id

        return newEffort.save(err => {
            if (err) {
                return next(err)
            }
            return res.status(200).json({errors: []})
        })

    };
};