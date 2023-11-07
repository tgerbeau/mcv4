describe('/connexion', () => {
  before (function () { 
    
  })
  beforeEach(()=>{
    cy.visit(Cypress.env('BASEURL') + "edition/carte/")
  }) 
  
  it('Login + Localize address', () => {

    cy.login_request(Cypress.env('USERNAME'), Cypress.env('PASSWORD'))
    cy.get('p.search > .IGNF > .search').type("36 quai des orfevres, 75001 Paris")
    cy.get('p.search').contains("36 quai des orfèvres, 75001 Paris").click()

    //Click sur le bouton "Ne plus afficher"   
    cy.get('.dialog > .onbd-container > .showonboarding > .ol-ext-check > span').click()
    
    cy.get('.dialog > .onbd-container > .onbd-buttons > .next').click()
    cy.get('[data-layer="ORTHOIMAGERY.ORTHOPHOTOS"] > .img > img').click()
    cy.get('.dialog > .onbd-container > .onbd-buttons > .next').click()
    
    //Double-Clique pour bypasser l'on-boading
    cy.contains('passer l\'aide').click()

  })

  it('Check draw buttons content', () => {
    cy.get('.dialog > .onbd-container > .onbd-buttons > :nth-child(3)').click()
    cy.get('[title="sélectionner un objet"]').should('be.visible')
    cy.get('.ol-drawpoint > button').should('be.visible')
    cy.get('.ol-drawline > button').should('be.visible')
    cy.get('.ol-drawpolygon > button').should('be.visible')
    cy.get('.toggle > button').click()
    cy.get('.ol-drawhole > button').should('be.visible')
    cy.get('.ol-drawregular > button').should('be.visible')
    cy.get('.ol-transform > button').should('be.visible')
  })

  it('Correctly draws a polygon with drawline button', () => {
    cy.get('.dialog > .onbd-container > .onbd-buttons > :nth-child(3)').click()
    cy.get('.ol-drawline > button').click()
    cy.get('.ol-fixedoverlay')
            .click(390, 450)
            .click(500, 350)
            .click(350, 50)
            .click(50, 150)
            .dblclick(390, 450); 
  })

  it('Correctly draws a point', () => {
    cy.get('.dialog > .onbd-container > .onbd-buttons > :nth-child(3)').click()
    cy.get('.ol-drawpoint > button').click()
    cy.get('.ol-fixedoverlay').click(500, 150)
  });
  
  it('Correctly draws a polygon with drawpolygon button', () => {
    cy.get('.dialog > .onbd-container > .onbd-buttons > :nth-child(3)').click()  
    cy.get('.ol-drawpolygon > button').click()
          cy.get('.ol-fixedoverlay')
            .click(190, 250)
            .click(200, 200)
            .click(250, 190)
            .click(260, 200)
            .click(300, 250)
            .click(190, 250);
  })
  
  it('correctly draws a square', () => {
    cy.get('.dialog > .onbd-container > .onbd-buttons > :nth-child(3)').click()
    cy.get('.toggle > button').click()
    cy.get('.ol-drawregular > button').click()
          cy.get('.ol-fixedoverlay')
            .click(100, 150)
            .click(150, 200)       
  });

})