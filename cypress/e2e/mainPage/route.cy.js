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

describe('createRoute', () => {
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
  it('user should be able to create a new route', () => {
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

  it('user should be able to modify an existing route', () => {
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
  it('the data should stay the same if there are wrong outputs', () => {
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

  it('the data should be able to get sorted', () => {
  })

  it('user should be able to delete route', () => {
  })

  it('user should be able to cancel deleting route', () => {
  })

  it('user should be able to cancel deleting route', () => {
  })
  

})


