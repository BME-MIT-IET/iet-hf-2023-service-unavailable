module.exports = () => {
    it('user should be able delete an effort', () => {
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
        cy.get('#newEditSubmit').click()

        cy.get('#hikingDiv').contains('Száraz Dániel')
        cy.get('#hikingDiv').contains('15:25:36')
        cy.get('#runningDiv').contains('Száraz Dániel').should('not.exist')
        cy.get('#runningDiv').contains('15:25:36').should('not.exist')
        cy.get('#bikeDiv').contains('Száraz Dániel').should('not.exist')
        cy.get('#bikeDiv').contains('15:25:36').should('not.exist')

        cy.get('#deleteHikingBtn').click()
        cy.get('#cancelDeleteBtn').click()

        cy.get('#hikingDiv').contains('Száraz Dániel')
        cy.get('#hikingDiv').contains('15:25:36')
        cy.get('#runningDiv').contains('Száraz Dániel').should('not.exist')
        cy.get('#runningDiv').contains('15:25:36').should('not.exist')
        cy.get('#bikeDiv').contains('Száraz Dániel').should('not.exist')
        cy.get('#bikeDiv').contains('15:25:36').should('not.exist')

        cy.get('#deleteHikingBtn').click({ force: true })
        cy.get('#deleteSubmit').click()

        cy.get('#hikingDiv').contains('Száraz Dániel').should('not.exist')
        cy.get('#hikingDiv').contains('15:25:36').should('not.exist')
        cy.get('#runningDiv').contains('Száraz Dániel').should('not.exist')
        cy.get('#runningDiv').contains('15:25:36').should('not.exist')
        cy.get('#bikeDiv').contains('Száraz Dániel').should('not.exist')
        cy.get('#bikeDiv').contains('15:25:36').should('not.exist')
    })
}
