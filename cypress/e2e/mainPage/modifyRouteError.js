module.exports = () => it('the data should stay the same if there are wrong outputs', () => {
    cy.get('.btn-warning').first().click();
    cy.get('#link').clear();
    cy.get('#link').type('ez egy nem ervenyes link');
    cy.get('input[type=submit]').click();
    cy.get('.navbar-brand').click();
    cy.get('tbody').children().last().children().eq(0).should('contain', 'Bokod - Tokod');
    cy.get('tbody').children().last().children().eq(1).should('contain', 123);
    cy.get('tbody').children().last().children().eq(2).should('contain', 321);
    cy.get('tbody').children().last().children().eq(3).should('contain', 0);
  })