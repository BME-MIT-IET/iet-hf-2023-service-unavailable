describe('goToEffortsPage', () => {
    it('user should be able to create a new route and get to the efforts page', () => {
      cy.visit('http://localhost:3000/')

      cy.get('#newRouteBtn').click()

      cy.url().should('equal', 'http://localhost:3000/routes/new')
      
      cy.get('#name').type('UltraBalaton', {force: true})
      cy.get('#length').type('256', {force: true})
      cy.get('#elevation').type('123', {force: true})
      cy.get('#link').type('https://ultrabalaton.hu/nnultrabalaton/', {force: true})
      
      cy.get('input[type=submit]').click()
      cy.url().should('include', 'http://localhost:3000/routes/show/')
    })
  })