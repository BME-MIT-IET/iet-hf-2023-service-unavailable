var length = 5

var recDelete = () => {
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

module.exports = () => {
    it('user should be able to create a new effort', () => {
        //remove unnecessary routes
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

        cy.visit('http://localhost:3000/')
        cy.get('#newRouteBtn').click()
        cy.url().should('equal', 'http://localhost:3000/routes/new')

        cy.get('#name').type('UltraBalaton', { force: true })
        cy.get('#length').type('256', { force: true })
        cy.get('#elevation').type('123', { force: true })
        cy.get('#link').type('https://ultrabalaton.hu/nnultrabalaton/', {
            force: true,
        })
        cy.get('input[type=submit]').click()
        cy.url().should('include', 'http://localhost:3000/routes/show/')

        cy.get('#newEffortBtn').click()
        cy.get('#name').type('Száraz Dániel', { force: true })
        cy.get('#time').type('15:25:36', { force: true })
        cy.get('#type').select('1')
        cy.get('#newEditCancel').click()

        cy.get('#hikingDiv').contains('Száraz Dániel').should('not.exist')
        cy.get('#hikingDiv').contains('15:25:36').should('not.exist')
        cy.get('#runningDiv').contains('Száraz Dániel').should('not.exist')
        cy.get('#runningDiv').contains('15:25:36').should('not.exist')
        cy.get('#bikeDiv').contains('Száraz Dániel').should('not.exist')
        cy.get('#bikeDiv').contains('15:25:36').should('not.exist')

        cy.get('#newEffortBtn').click()
        cy.get('#name').type('Száraz Dániel', { force: true })
        cy.get('#time').type('15:25:36', { force: true })
        cy.get('#type').select('1')
        cy.get('#newEditSubmit').click()

        cy.get('#hikingDiv').contains('Száraz Dániel')
        cy.get('#hikingDiv').contains('15:25:36')
        cy.get('#runningDiv').contains('Száraz Dániel').should('not.exist')
        cy.get('#runningDiv').contains('15:25:36').should('not.exist')
        cy.get('#bikeDiv').contains('Száraz Dániel').should('not.exist')
        cy.get('#bikeDiv').contains('15:25:36').should('not.exist')

        cy.get('#navTitle').click()
        cy.get('#UltraBalaton_idx').contains('1')
    })
}
