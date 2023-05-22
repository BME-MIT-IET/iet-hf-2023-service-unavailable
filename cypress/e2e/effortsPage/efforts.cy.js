const createEffort = require('./createEffort')
const createEffortError = require('./createEffortError')
const deleteEffort = require('./deleteEffort')
const goToEffortsPage = require('./goToEffortsPage')
const updateEffort = require('./updateEffort')
const updateEffortError = require('./updateEffortError')
const checkEffortsPageContent = require('./checkEffortsPageContent')
const createMoreEfforts = require('./createMoreEfforts')

let length = 5
let recDelete = () => {
    if (length-- > 0) {
        cy.get('.delete')
            .eq(0)
            .then(($row) => {
                $row.click()
                cy.get('#deleteSubmit').click()
            })
        recDelete()
    }
}

describe('EffortsTests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
        cy.get('#newRouteBtn').click()
        cy.url().should('equal', 'http://localhost:3000/routes/new')
        cy.get('#name').type('Bokod - Tokod')
        cy.get('#length').type('123')
        cy.get('#elevation').type('321')
        cy.get('#link').type('https://www.google.com/bokod-tokod')
        cy.get('input[type=submit]').click()
        cy.get('.nav-link').click()
        cy.url().should('equal', 'http://localhost:3000/routes/new')
        cy.visit('http://localhost:3000/')

        cy.get('.delete').then(($value) => {
            if ($value.length) {
                length = $value.length
                recDelete()
            }
        })
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(500)
        cy.get('#newRouteBtn').click()
        cy.url().should('equal', 'http://localhost:3000/routes/new')
        cy.get('#name').type('Bokod - Tokod')
        cy.get('#length').type('123')
        cy.get('#elevation').type('321')
        cy.get('#link').type('https://www.google.com/bokod-tokod')
        cy.get('input[type=submit]').click()
        cy.get('.nav-link').click()
        cy.url().should('equal', 'http://localhost:3000/routes/new')
        cy.visit('http://localhost:3000/')
    })

    goToEffortsPage()
    createEffort()
    createEffortError()
    createMoreEfforts()
    updateEffort()
    updateEffortError()
    deleteEffort()
    checkEffortsPageContent()
})
