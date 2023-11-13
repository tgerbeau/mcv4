describe('Test save map', () => {
    before (function () { 
        
    })
    it('Log in, create a map and save it !', () => {
          
            
            cy.visit(Cypress.env('BASEURL') + "edition/carte/")
            
            cy.get('p.search > .IGNF > .search').type('Les courgettes')
            cy.get('.dialog > .onbd-container > .onbd-buttons > .next').click()
            
            //Clique sur le bouton "Commencer" 
            cy.get('.dialog > .onbd-container > .onbd-buttons > .next').click()

            //Double-Clique pour bypasser l'on-boading
            cy.contains('passer l\'aide').click()

            //Sauvegarde
            cy.get('.fi-save').click()
            var min = 0;
            var max = 5000;

            var x = Math.floor(Math.random()*(max-min+1)+min);
            
            cy.get('.isok > .title').type("This title " + x +  " is great, isn't it ? Something longer could be better for testing long title") 
            cy.get('.description').type("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.")
            cy.get('.theme').select('Agriculture')
            cy.get('.image').type('https://macarte.ign.fr/assets/bundles/app/img/charte/IGN_log_RVB_72.jpg')
            cy.get('.ol-buttons > [type="submit"]').click()

            //Login 
            cy.get('.name').type(Cypress.env('USERNAME'))
            cy.get('.pwd').type(Cypress.env('PASSWORD'))
            cy.get('.ol-buttons > [type="submit"]').click()
            
            //Click sur le menu 
            cy.get('.fi-simple-user').click({force: true})  
            //Selectioner Le menu item "Mes cartes"
            cy.get('.submenu > ul > :nth-child(3) > a').click().then(($nav) => {

                //Login (seconde reconnection)
                cy.get('.name').type(Cypress.env('USERNAME'))
                cy.get('.pwd').type(Cypress.env('PASSWORD'))
                cy.get('.ol-buttons > [type="submit"]').click()    
                
                cy.get('#page-cartes > h1').should('be.visible')
                cy.contains ("Mes cartes")
                
                cy.get('.mc-list > .mc-search > [type="search"]').type ("This title " + x +  " is great, isn't it ?")
                cy.get('.mc-list > .mc-search > .search').click()

                cy.wait (4000)
                //class="ol-ext-check ol-ext-checkbox small"    
                //Vérifier que la nouvelle carte soit présente dans les résultats
                cy.get('.macarte > .ol-ext-check > span').click() 
                cy.get('.actions > .button-accent').click({force: true})
                cy.get('.ol-buttons > [type="submit"]').click()
                cy.logout()
            })
                 
    })
})


