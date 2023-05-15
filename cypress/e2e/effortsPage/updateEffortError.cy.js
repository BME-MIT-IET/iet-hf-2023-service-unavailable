describe('updateEffort', () => {
    it('user should be able to update an effort and get the correct error messages', () => {
      cy.visit('http://localhost:3000/')
      cy.get('#newRouteBtn').click()
      cy.url().should('equal', 'http://localhost:3000/routes/new')
      
      cy.get('#name').type('UltraBalaton', {force: true})
      cy.get('#length').type('256', {force: true})
      cy.get('#elevation').type('123', {force: true})
      cy.get('#link').type('https://ultrabalaton.hu/nnultrabalaton/', {force: true})
      cy.get('input[type=submit]').click()
      cy.url().should('include', 'http://localhost:3000/routes/show/')

      //create new effort
      cy.get('#newEffortBtn').click()
      cy.get('#name').type('En', {force: true})
      cy.get('#time').type('15:25:30', { force: true })
      cy.get('#type').select('1')
      cy.get('#newEditSubmit').click()

      cy.get('#hikingDiv').contains("En")
      cy.get('#hikingDiv').contains("15:25:30")
      cy.get('#runningDiv').contains("En").should('not.exist')
      cy.get('#runningDiv').contains("15:25:30").should('not.exist')
      cy.get('#bikeDiv').contains("En").should('not.exist')
      cy.get('#bikeDiv').contains("15:25:30").should('not.exist')

      cy.get('#editHikingBtn').click()
      cy.get('#name').clear()
      cy.get('#time').clear({ force: true })

      cy.get('#newEditSubmit').click()

      cy.get('#errors').contains('Add meg a teljesítő nevét!')
      cy.get('#errors').contains('Add meg a teljesítés időtartamát!')

      cy.get('#name').type('Elek', {force: true})
      cy.get('#newEditSubmit').click()

      cy.get('#errors').contains('Add meg a teljesítés időtartamát!')

      cy.get('#name').clear()
      cy.get('#time').type('15:25:36', {force: true})
      cy.get('#newEditSubmit').click()

      cy.get('#errors').contains('Add meg a teljesítő nevét!')

      cy.get('#name').type('Elek', {force: true})
      cy.get('#newEditSubmit').click()

      cy.get('#hikingDiv').contains("Elek")
      cy.get('#hikingDiv').contains("15:25:36")
      cy.get('#runningDiv').contains("Elek").should('not.exist')
      cy.get('#runningDiv').contains("15:25:36").should('not.exist')
      cy.get('#bikeDiv').contains("Elek").should('not.exist')
      cy.get('#bikeDiv').contains("15:25:36").should('not.exist')

      cy.get('#hikingDiv').contains("En").should('not.exist')
      cy.get('#hikingDiv').contains("15:25:30").should('not.exist')
      cy.get('#runningDiv').contains("En").should('not.exist')
      cy.get('#runningDiv').contains("15:25:30").should('not.exist')
      cy.get('#bikeDiv').contains("En").should('not.exist')
      cy.get('#bikeDiv').contains("15:25:30").should('not.exist')

      cy.get('#editHikingBtn').click()
      cy.get('#time').clear({ force: true }).type("-15:-25:-30", {force: true})
      cy.get('#newEditSubmit').click()

      cy.get('#errors').contains('Érvénytelen időformátum! Helyesen: óó:pp:mm')
    })
  })