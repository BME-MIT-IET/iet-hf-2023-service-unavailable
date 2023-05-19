module.exports = () => it('user should be able to cancel deleting route', () => {
    cy.get('.delete').first().click();
    cy.wait(300);
    cy.get('.btn-secondary').first().click();
    cy.get('tbody').children().last().children().eq(0).should('contain', 'Bokod - Tokod');
    cy.get('tbody').children().last().children().eq(1).should('contain', 123);
    cy.get('tbody').children().last().children().eq(2).should('contain', 321);
    cy.get('tbody').children().last().children().eq(3).should('contain', 0);
  })