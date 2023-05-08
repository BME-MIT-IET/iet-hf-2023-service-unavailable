const getRoutesMW = require('../middlewares/routes/getRoutesMW')
const getEffortCountMW = require('../middlewares/efforts/getEffortCountMW')
const saveRouteMW = require('../middlewares/routes/saveRouteMW')
const getRouteMW = require('../middlewares/routes/getRouteMW')
const getTitleMW = require('../middlewares/routes/getTitleMW')
const delRouteMW = require('../middlewares/routes/delRouteMW')
const getEffortMW = require('../middlewares/efforts/getEffortMW')
const getEffortsForRouteMW = require('../middlewares/efforts/getEffortsForRouteMW')
const delEffortsForRouteMW = require('../middlewares/efforts/delEffortsForRouteMW')
const saveEffortMW = require('../middlewares/efforts/saveEffortMW')
const delEffortMW = require('../middlewares/efforts/delEffortMW')
const renderMW = require('../middlewares/renderMW')

const RouteModel = require('../models/route');
const EffortModel = require('../models/effort');

module.exports = app => {
    const objRepo = {
        RouteModel: RouteModel,
        EffortModel: EffortModel
    }

    app.get('/',
        getRoutesMW(objRepo),
        getEffortCountMW(objRepo),
        renderMW('index', objRepo)
    )

    app.use('/routes/new',
        saveRouteMW(objRepo),
        getTitleMW(objRepo),
        renderMW('new_edit', objRepo)
    )

    app.use('/routes/edit/:route_id',
        getRouteMW(objRepo),
        saveRouteMW(objRepo),
        getTitleMW(objRepo),
        renderMW('new_edit', objRepo)
    )

    app.get('/routes/del/:route_id',
        getRouteMW(objRepo),
        delEffortsForRouteMW(objRepo),
        delRouteMW(objRepo)    //redirects instead of rendering
    )

    app.get('/routes/show/:route_id',
        getRouteMW(objRepo),
        getEffortsForRouteMW(objRepo),
        renderMW('route', objRepo)
    )

    app.post('/routes/new-effort/:route_id',
        getRouteMW(objRepo),
        saveEffortMW(objRepo)  //sends JSON instead of rendering
    )

    app.post('/routes/:route_id/edit-effort/:effort_id',
        getRouteMW(objRepo),
        getEffortMW(objRepo),
        saveEffortMW(objRepo)  //sends JSON instead of rendering
    )

    app.get('/routes/:route_id/del-effort/:effort_id',
        getRouteMW(objRepo),
        getEffortMW(objRepo),
        delEffortMW(objRepo)   //redirects instead of rendering
    )
}