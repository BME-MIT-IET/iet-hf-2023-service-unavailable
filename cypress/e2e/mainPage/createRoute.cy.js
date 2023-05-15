describe('createRoute', () => {
    it('user should be able to create a new route', () => {
      cy.visit('http://localhost:3000/')

      cy.get('#newRouteBtn').click()

      cy.url().should('equal', 'http://localhost:3000/routes/new')
    })
  })