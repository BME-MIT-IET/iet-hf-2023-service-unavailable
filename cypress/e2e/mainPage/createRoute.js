module.exports = () => {
    it('user should be able to create a new route',() =>{
        cy.get('#newRouteBtn').click();
        cy.url().should('equal', 'http://localhost:3000/routes/new');
        cy.get('#name').type('Tárkány - Párkány');
        cy.get('#length').type('100.00');
        cy.get('#elevation').type('100.00');
        cy.get('#link').type('https://www.google.com/bokod-tokod');
        cy.get('input[type=submit]').click();
        cy.get('.navbar-brand').click();
        cy.url().should('equal', 'http://localhost:3000/');
        cy.get('tbody').children().last().children().eq(1).should('contain', 100);
        cy.get('tbody').children().last().children().eq(2).should('contain', 100);
        cy.get('tbody').children().last().children().eq(3).should('contain', 0);
    })
}