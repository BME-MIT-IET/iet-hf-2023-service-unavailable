const expect = require('chai').expect
const getRoutesMW = require('../middlewares/routes/getRoutesMW')

describe('getRoutes middleware ', () => {

  it('should return routes', (done) => {
    const req = {};
    const res = {
      locals: {}
    }
    const fakeRouteModel = {
      find: (some, cb) => {
        cb(undefined, [{toObject: () => 'route1'}, {toObject: () => 'route2'}])
      }
    }

    getRoutesMW({
      RouteModel: fakeRouteModel
    })(req, res, (err) => {
      expect(res.locals.routes).to.eql(['route1', 'route2']);
      expect(err).to.eql(undefined)
      done()
    })
  })

  it('should return error when db returns error', (done) => {
    const fakeRouteModel = {
      find: (some, cb) => {
        cb('hiba', undefined)
      }
    }

    getRoutesMW({
      RouteModel: fakeRouteModel
    })({}, {}, (err) => {
      expect(err).to.eql('hiba')
      done()
    })
  })
})