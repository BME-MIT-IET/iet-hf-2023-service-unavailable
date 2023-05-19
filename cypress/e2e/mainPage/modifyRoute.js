module.exports = () => it('user should be able to modify an existing route', () => {
    cy.get('.btn-warning').first().click();
    cy.get('#name').clear();
    cy.get('#name').type('Felcsút - Nyírmártonfalva');
    cy.get('#length').clear();
    cy.get('#length').type('200');
    cy.get('#elevation').clear();
    cy.get('#elevation').type('155.00');
    cy.get('input[type=submit]').click();
    cy.get('.navbar-brand').click();
    cy.get('tbody').children().last().children().eq(0).should('contain', 'Felcsút - Nyírmártonfalva');
    cy.get('tbody').children().last().children().eq(1).should('contain', 200);
    cy.get('tbody').children().last().children().eq(2).should('contain', 155);
    cy.get('tbody').children().last().children().eq(3).should('contain', 0);
  })