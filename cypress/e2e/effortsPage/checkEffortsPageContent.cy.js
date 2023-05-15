describe('checkEffortsPageContent', () => {
    it('user should be able to see valid and grammatically correct information', () => {
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

        cy.get('#routeTitle').contains('UltraBalaton')
        cy.get('#routeInfos').contains('Hossz: 256 km')
        cy.get('#routeInfos').contains('Szintemelkedés: 123 m')
        cy.get('#routeInfos').contains(
            'Link: https://ultrabalaton.hu/nnultrabalaton/'
        )

        cy.get('#hikingDiv').contains('Túrázva')
        cy.get('#hikingDiv').contains(
            'Még senki sem teljesítette ezt az útvonalat ilyen módon. Legyél te az első!'
        )

        cy.get('#runningDiv').contains('Futva')
        cy.get('#runningDiv').contains(
            'Még senki sem teljesítette ezt az útvonalat ilyen módon. Legyél te az első!'
        )

        cy.get('#bikeDiv').contains('Kerékpározva')
        cy.get('#bikeDiv').contains(
            'Még senki sem teljesítette ezt az útvonalat ilyen módon. Legyél te az első!'
        )

        cy.get('#newEffortBtn').click()
        cy.get('#name').type('Száraz Dániel', { force: true })
        cy.get('#time').type('15:25:36', { force: true })
        cy.get('#type').select('1')

        cy.get('#new-effort-form').contains('Teljesítő neve')
        cy.get('#new-effort-form').contains('Teljesítés ideje (óó:pp:mm)')
        cy.get('#new-effort-form').contains('Teljesítés módja')

        cy.get('#modalTitle').contains('Új teljesítés - UltraBalaton')

        cy.get('#newEditSubmit').click()

        cy.get('#hikingDiv').contains('Túrázva')
        cy.get('#hikingDiv').contains('Név')
        cy.get('#hikingDiv').contains('Idő')
        cy.get('#hikingDiv').contains('Módosítás')

        cy.get('#runningDiv').contains('Futva')
        cy.get('#runningDiv').contains(
            'Még senki sem teljesítette ezt az útvonalat ilyen módon. Legyél te az első!'
        )

        cy.get('#bikeDiv').contains('Kerékpározva')
        cy.get('#bikeDiv').contains(
            'Még senki sem teljesítette ezt az útvonalat ilyen módon. Legyél te az első!'
        )
    })
})
