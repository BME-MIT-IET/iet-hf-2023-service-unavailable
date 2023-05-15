var length = 5

var recDelete = () => {
    if (length-- > 0) {
        cy.get('.delete')
            .eq(0)
            .then(($row) => {
                $row.click()
                cy.get('#deleteSubmit').click()
            })
        recDelete()
    }
}

describe('createMoreEfforts', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
        cy.get('#newRouteBtn').click()

        cy.url().should('equal', 'http://localhost:3000/routes/new')

        cy.get('#name').type('Bokod - Tokod')
        cy.get('#length').type('123')
        cy.get('#elevation').type('321')
        cy.get('#link').type('https://www.google.com/bokod-tokod')
        cy.get('input[type=submit]').click()
        cy.get('.nav-link').click()
        cy.url().should('equal', 'http://localhost:3000/routes/new')
        cy.visit('http://localhost:3000/')

        cy.get('.delete').then(($value) => {
            if ($value.length) {
                length = $value.length
                console.log(length)
                recDelete()
            }
        })
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(500)
    })

    it('user should be able to create more efforts', () => {
        cy.visit('http://localhost:3000/')
        cy.get('#newRouteBtn').click()
        cy.url().should('equal', 'http://localhost:3000/routes/new')

        cy.get('#name').type('UltraBalaton', { force: true })
        cy.get('#length').type('256', { force: true })
        cy.get('#elevation').type('123', { force: true })
        cy.get('#link').type('https://ultrabalaton.hu/nnultrabalaton/', {
            force: true,
        })
        cy.get('input[type=submit]').click()
        cy.url().should('include', 'http://localhost:3000/routes/show/')

        cy.get('#newEffortBtn').click()
        cy.get('#name').type('Fekete Sámuel', { force: true })
        cy.get('#time').type('20:20:69', { force: true })
        cy.get('#type').select('1')
        cy.get('#newEditSubmit').click()

        cy.get('#newEffortBtn').click()
        cy.get('#name').type('Teszt Elek', { force: true })
        cy.get('#time').type('15:25:15', { force: true })
        cy.get('#type').select('2')
        cy.get('#newEditSubmit').click()

        cy.get('#newEffortBtn').click()
        cy.get('#name').type('Száraz Dániel', { force: true })
        cy.get('#time').type('15:25:36', { force: true })
        cy.get('#type').select('1')
        cy.get('#newEditSubmit').click()

        cy.get('#hikingDiv').contains('Száraz Dániel')
        cy.get('#hikingDiv').contains('15:25:36')
        cy.get('#hikingDiv').contains('1.')

        cy.get('#runningDiv').contains('Száraz Dániel').should('not.exist')
        cy.get('#runningDiv').contains('15:25:36').should('not.exist')

        cy.get('#bikeDiv').contains('Száraz Dániel').should('not.exist')
        cy.get('#bikeDiv').contains('15:25:36').should('not.exist')

        cy.get('#hikingDiv').contains('Fekete Sámuel')
        cy.get('#hikingDiv').contains('20:20:69')
        cy.get('#hikingDiv').contains('2.')

        cy.get('#runningDiv').contains('Fekete Sámuel').should('not.exist')
        cy.get('#runningDiv').contains('20:20:69').should('not.exist')

        cy.get('#bikeDiv').contains('Fekete Sámuel').should('not.exist')
        cy.get('#bikeDiv').contains('20:20:69').should('not.exist')

        cy.get('#hikingDiv').contains('Teszt Elek').should('not.exist')
        cy.get('#hikingDiv').contains('15:25:15').should('not.exist')

        cy.get('#runningDiv').contains('Teszt Elek')
        cy.get('#runningDiv').contains('15:25:15')

        cy.get('#bikeDiv').contains('Teszt Elek').should('not.exist')
        cy.get('#bikeDiv').contains('15:25:15').should('not.exist')

        cy.get('#navTitle').click()
        cy.get('#UltraBalaton_idx').contains('3')
    })
})
