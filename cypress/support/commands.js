// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('login', (username, password) => {
    
            cy.visit(Cypress.env('BASEURL') + "connexion")
            cy.get('#inputUsername').type(username) 
            cy.get('#inputPassword').type(password) 
            cy.get('form > .btn').contains("Connexion").click()
            cy.title().should('eq', 'Ma Carte - IGN MA CARTE')
            cy.get('h1').contains('Créez des cartes personnalisées')
            cy.get('li.nav-item.connected').should('exist')
})
Cypress.Commands.add('logout', () => {

            cy.get('#dropdownUserMenu > span').should('exist')
            cy.get('#dropdownUserMenu > span').click()
            //Clique sur l'item "Me déconnecter" 
            cy.get('.userMenu > :nth-child(5) > a').click()
})

Cypress.Commands.add('login_request', (username, password) => { 
    cy.request({
      method: 'POST',
      url: 'https://macarte.ign.fr/api/login',
      body: {
        username: username,
        password: password,
        }
    })
    .then((resp) => {
      window.localStorage.setItem('token', resp.body.token)
    })
  
  })
