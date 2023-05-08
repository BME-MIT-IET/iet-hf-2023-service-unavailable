const expect = require('chai').expect
const saveEffortMW = require('../middlewares/efforts/saveEffortMW')

describe('saveEffort middleware ', function () {
    it("should return 200 and empty array with correct parameters when it creates a new effort", () => {
        const req = {
            body: {
                name: " futó kör",
                time: "2:5:3",
                type: 2
            }
        }

        const res = {
            status: (code) => ({
                json: (obj) => {
                    expect(obj.errors).to.be.eql([])
                    expect(code).to.be.eql(200)
                }

            }),
            locals: {
                route: {
                    _id: 3
                }
            }
        }

        const fakeEffortModel = class EffortModel {
            save(cb){
                expect(this.name).to.be.eql("futó kör")
                expect(this.time).to.be.eql("02:05:03")
                expect(this.type).to.be.eql(2)
                expect(this._route).to.be.eql(3)
                cb(undefined)
            }
        }

        saveEffortMW({EffortModel: fakeEffortModel})(req, res, (err) => {
            expect(0).to.be.eql(1)
        })
    })

    it("should return 200 and empty array with correct parameters when it updates an existing effort", () => {
        const req = {
            body: {
                name: "futó kör",
                time: "02:5:03",
                type: 2
            }
        }

        const res = {
            status: (code) => ({
                json: (obj) => {
                    expect(obj.errors).to.be.eql([])
                    expect(code).to.be.eql(200)
                }
            }),
            locals: {
                route: {
                    _id: 3
                },
                effort: {
                    save: (cb) => {
                        expect(res.locals.effort.name).to.be.eql("futó kör")
                        expect(res.locals.effort.time).to.be.eql("02:05:03")
                        expect(res.locals.effort.type).to.be.eql(2)
                        expect(res.locals.effort._route).to.be.eql(3)
                        cb(undefined)
                    }
                }
            }
        }
        saveEffortMW()(req, res, (err) => {
            expect(0).to.be.eql(1)
        })
    })

    it("should return 400 and an array with errors after incorrect parameters", () => {
        const req = {
            body: {
                name: "  ",
                time: "2:5",
                type: 0
            }
        }

        const res = {
            status: (code) => ({
                json: (obj) => {
                    expect(obj.errors).to.be.eql(['Add meg a teljesítő nevét!', 'Érvénytelen időformátum! Helyesen: óó:pp:mm', 'Érvénytelen teljesítési mód!'])
                    expect(code).to.be.eql(400)
                }
            }),
            locals: {
                route: {
                    _id: 3
                }
            }
        }

        const fakeEffortModel = class EffortModel {
            save(cb) {
                expect(0).to.be.eql(1)
            }
        }
        saveEffortMW({EffortModel: fakeEffortModel})(req, res, (err) => {
            expect(0).to.be.eql(1)
        })
    })

    it("should return 400 and an array with other errors after different incorrect parameters", () => {
        const req = {
            body: {
                name: "",
                time: "2:sad:4",
                type: "xd"
            }
        }

        const res = {
            status: (code) => ({
                json: (obj) => {
                    expect(obj.errors).to.be.eql(['Add meg a teljesítő nevét!', 'Érvénytelen óra, perc vagy másodperc!', 'Érvénytelen teljesítési mód!'])
                    expect(code).to.be.eql(400)
                }
            }),
            locals: {
                route: {
                    _id: 3
                }
            }
        }
        const fakeEffortModel = class EffortModel {
            save(cb) {
                expect(0).to.be.eql(1)
            }
        }
        saveEffortMW({EffortModel: fakeEffortModel})(req, res, (err) => {
            expect(0).to.be.eql(1)
        })
    })

    it("should return 400 and an array with other errors after different incorrect parameters", () => {
        const req = {
            body: {
                name: "gdfgfd",
                time: "",
                type: 5
            }
        }

        const res = {
            status: (code) => ({
                json: (obj) => {
                    expect(obj.errors).to.be.eql(['Add meg a teljesítés időtartamát!', 'Érvénytelen teljesítési mód!'])
                    expect(code).to.be.eql(400)
                }
            }),
            locals: {
                route: {
                    _id: 3
                }
            }
        }
        const fakeEffortModel = class EffortModel {
            save(cb) {
                expect(0).to.be.eql(1)
            }
        }
        saveEffortMW({EffortModel: fakeEffortModel})(req, res, (err) => {
            expect(0).to.be.eql(1)
        })
    })

    it("should return error when db returns error", (done) => {
        const req = {
            body: {
                name: "gdfgdf",
                time: "2:4:4",
                type: 2
            }
        }

        const res = {
            locals: {
                route: {
                    _id: 3
                }
            },
            status: (code) => {
                expect(1).to.be.eql(0)
            }
        }

        const fakeEffortModel = class EffortModel {
            save(cb) {
                cb("hiba")
            }
        }

        const saveMW = saveEffortMW({EffortModel: fakeEffortModel})
        saveMW(req, res, (err) => {
            expect(err).to.eql('hiba');
            done();
        })
    })
})
