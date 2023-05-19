module.exports = () => it('user should be able to delete route', () => {
    cy.get('.delete').first().click();
    cy.wait(300);
    cy.get('#deleteSubmit').click();
    cy.get("p").first().should('contain', "Még nincs egy útvonal se. Legyen a tied az első!");
  })