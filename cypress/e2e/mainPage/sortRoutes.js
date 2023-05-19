module.exports = () => it('the data should be able to get sorted', () => {

    //first
    cy.get('#newRouteBtn').click();
    cy.url().should('equal', 'http://localhost:3000/routes/new');
    cy.get('#name').type('Tárkány - Párkány');
    cy.get('#length').type('100.00');
    cy.get('#elevation').type('100.00');
    cy.get('#link').type('https://www.google.com/bokod-tokod');
    cy.get('input[type=submit]').click();
    cy.get('.navbar-brand').click();
    cy.url().should('equal', 'http://localhost:3000/');

    //second
    cy.get('#newRouteBtn').click();
    cy.url().should('equal', 'http://localhost:3000/routes/new');
    cy.get('#name').type('Kéktúra');
    cy.get('#length').type('1000');
    cy.get('#elevation').type('1500');
    cy.get('#link').type('https://www.google.com/kektura');
    cy.get('input[type=submit]').click();
    cy.get('.navbar-brand').click();
    cy.url().should('equal', 'http://localhost:3000/');

    //third
    cy.get('#newRouteBtn').click();
    cy.url().should('equal', 'http://localhost:3000/routes/new');
    cy.get('#name').type('Mount Everest');
    cy.get('#length').type('11');
    cy.get('#elevation').type('8848');
    cy.get('#link').type('https://www.google.com/mount+everest');
    cy.get('input[type=submit]').click();
    cy.get('.navbar-brand').click();
    cy.url().should('equal', 'http://localhost:3000/');


    //sort by name
    cy.get('thead').children().first().children().eq(0).click();
    //first in order
    cy.get('tbody').children().first().children().eq(0).should('contain', 'Tárkány - Párkány');
    cy.get('tbody').children().first().children().eq(1).should('contain', 100);
    cy.get('tbody').children().first().children().eq(2).should('contain', 100);
    cy.get('tbody').children().first().children().eq(3).should('contain', 0);
    //last in order
    cy.get('tbody').children().last().children().eq(0).should('contain', 'Bokod - Tokod');
    cy.get('tbody').children().last().children().eq(1).should('contain', 123);
    cy.get('tbody').children().last().children().eq(2).should('contain', 321);
    cy.get('tbody').children().last().children().eq(3).should('contain', 0);
    //reversed
    cy.get('thead').children().first().children().eq(2).click();
    //last in order
    cy.get('tbody').children().last().children().eq(0).should('contain', 'Tárkány - Párkány');
    cy.get('tbody').children().last().children().eq(1).should('contain', 100);
    cy.get('tbody').children().last().children().eq(2).should('contain', 100);
    cy.get('tbody').children().last().children().eq(3).should('contain', 0);
    //first in order
    cy.get('tbody').children().first().children().eq(0).should('contain', 'Bokod - Tokod');
    cy.get('tbody').children().first().children().eq(1).should('contain', 123);
    cy.get('tbody').children().first().children().eq(2).should('contain', 321);
    cy.get('tbody').children().first().children().eq(3).should('contain', 0);
    
    //sort by distance
      cy.get('thead').children().first().children().eq(1).click();
      //first in order
      cy.get('tbody').children().first().children().eq(0).should('contain', 'Mount Everest');
      cy.get('tbody').children().first().children().eq(1).should('contain', 11);
      cy.get('tbody').children().first().children().eq(2).should('contain', 8848);
      cy.get('tbody').children().last().children().eq(3).should('contain', 0);
      //last in order
      cy.get('tbody').children().last().children().eq(0).should('contain', 'Kéktúra');
      cy.get('tbody').children().last().children().eq(1).should('contain', 100);
      cy.get('tbody').children().last().children().eq(2).should('contain', 1500);
      cy.get('tbody').children().first().children().eq(3).should('contain', 0);
      //reversed
      cy.get('thead').children().first().children().eq(1).click();
      //last in order
      cy.get('tbody').children().last().children().eq(0).should('contain', 'Mount Everest');
      cy.get('tbody').children().last().children().eq(1).should('contain', 11);
      cy.get('tbody').children().last().children().eq(2).should('contain', 8848);
      cy.get('tbody').children().last().children().eq(3).should('contain', 0);
      //first in order
      cy.get('tbody').children().last().children().eq(0).should('contain', 'Kéktúra');
      cy.get('tbody').children().last().children().eq(1).should('contain', 1000);
      cy.get('tbody').children().last().children().eq(2).should('contain', 1500);
      cy.get('tbody').children().last().children().eq(3).should('contain', 0);

    //sort by elevation
    cy.get('thead').children().first().children().eq(2).click();
    //first in order
    cy.get('tbody').children().first().children().eq(0).should('contain', 'Tárkány - Párkány');
    cy.get('tbody').children().first().children().eq(1).should('contain', 100);
    cy.get('tbody').children().first().children().eq(2).should('contain', 100);
    cy.get('tbody').children().first().children().eq(3).should('contain', 0);
    //last in order
    cy.get('tbody').children().last().children().eq(0).should('contain', 'Mount Everest');
    cy.get('tbody').children().last().children().eq(1).should('contain', 11);
    cy.get('tbody').children().last().children().eq(2).should('contain', 8848);
    cy.get('tbody').children().last().children().eq(3).should('contain', 0);
    //reversed
    cy.get('thead').children().first().children().eq(2).click();
    //last in order
    cy.get('tbody').children().last().children().eq(0).should('contain', 'Tárkány - Párkány');
    cy.get('tbody').children().last().children().eq(1).should('contain', 100);
    cy.get('tbody').children().last().children().eq(2).should('contain', 100);
    cy.get('tbody').children().last().children().eq(3).should('contain', 0);
    //first in order
    cy.get('tbody').children().first().children().eq(0).should('contain', 'Mount Everest');
    cy.get('tbody').children().first().children().eq(1).should('contain', 11);
    cy.get('tbody').children().first().children().eq(2).should('contain', 8848);
    cy.get('tbody').children().first().children().eq(3).should('contain', 0);
  })