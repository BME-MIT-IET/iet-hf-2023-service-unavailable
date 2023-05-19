const createRoute = require('../mainPage/createRoute')
const modifyRoute = require('../mainPage/modifyRoute');
const deleteRoute = require('./deleteRoute');
const deleteRouteCancel = require('./deleteRouteCancel');
const modifyRouteError = require('./modifyRouteError');
const sortRoutes = require('./sortRoutes');

var length = 5;
var recDelete = () => {
  if (length-- > 0) {
    cy.get('.delete').eq(0).then($row => {
      $row.click();
      cy.get('#deleteSubmit').click();
    })
    recDelete();
  }
};


describe('RouteTests', () => {

  beforeEach(() => {
      cy.visit('http://localhost:3000/');
      cy.get('#newRouteBtn').click();
  
      cy.url().should('equal', 'http://localhost:3000/routes/new');
  
      cy.get('#name').type('Bokod - Tokod');
      cy.get('#length').type('123');
      cy.get('#elevation').type('321');
      cy.get('#link').type('https://www.google.com/bokod-tokod');
      cy.get('input[type=submit]').click();
      cy.get('.nav-link').click();
      cy.url().should('equal', 'http://localhost:3000/routes/new');
      cy.visit('http://localhost:3000/');
  
      cy.get('.delete').then(($value)=>
      {
        if ($value.length) {
          length = $value.length;
          console.log(length);
          recDelete();
        }
      });
      cy.wait(500);
      cy.get('#newRouteBtn').click();
      cy.url().should('equal', 'http://localhost:3000/routes/new');
      cy.get('#name').type('Bokod - Tokod');
      cy.get('#length').type('123');
      cy.get('#elevation').type('321');
      cy.get('#link').type('https://www.google.com/bokod-tokod');
      cy.get('input[type=submit]').click();
      cy.get('.nav-link').click();
      cy.url().should('equal', 'http://localhost:3000/routes/new');
      cy.visit('http://localhost:3000/');
    })
  createRoute();
  modifyRoute();
  modifyRouteError();
  sortRoutes();
  deleteRoute();
  deleteRouteCancel();
})


