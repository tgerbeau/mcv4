describe('/connexion', () => {
    before (function () { 
        cy.login_request(Cypress.env('USERNAME'), Cypress.env('PASSWORD'))
    })
    beforeEach(()=>{
        cy.visit(Cypress.env('BASEURL') + "edition/carte/")
        cy.get('.dialog > .onbd-container > .onbd-buttons > :nth-child(3)').click()
    }) 
    it('Présence des éléments du menu verticale gauche', () => {
        
        cy.get('.fi-pencil').should('be.visible')
        cy.get('.popup > .fi-comment').should('be.visible')
        cy.get('.fg-map-legend').should('be.visible')
        cy.get('.fg-search-attribtues').should('be.visible')
        cy.get('.fi-tag').should('be.visible')
        cy.get('.fi-location').should('be.visible')
    })

    it('Présence des éléments du menu horizontal droite', () => {
        
        cy.get('.fi-new').should('be.visible')
        cy.get('.fi-open').should('be.visible')
        cy.get('.fi-save').should('be.visible')
        cy.get('.fi-download').should('be.visible')
        cy.get('.fi-share-alt').should('be.visible')
        cy.get('.fi-print').should('be.visible')
    })

    it('Test de la localisation par adresse', () => {
        cy.viewport(1000, 660)
        cy.get('.fi-location').click()
        cy.get('body').trigger('keydown', { keyCode: 122, which: 122 })
        cy.get('.search-bar > .IGNF > .search', { timeout: 8000 }).type("36 Quai des orfèvres")
        cy.contains("36 Quai des Orfèvres").click()
        cy.wait (6000)
        cy.compareSnapshot('map', 0.1)
    })

})