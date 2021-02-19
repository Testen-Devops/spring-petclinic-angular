it('should add related to a vet and show all visits of vet', () => {
  cy.visit('/');
  cy.contains('Owners').click();
  cy.contains('All').click();
  cy.contains('Peter McTavish').click();
  cy.contains('Add Visit').click();
  cy.get('input')
    .eq(0)
    .should('have.attr','name','date')
    .type('2005/01/06')

  cy.get('input')
    .eq(1)
    .should('have.attr','name','description')
    .type('Some description for testing')
    
  cy.get('select')
    .should('have.attr','name','vet')
    .select('Sharon Jenkins')

    cy.contains('Add Visit').click();

    cy.contains('Sharon Jenkins').first().click({force: true})
    // cy.url().should('equal', Cypress.config().baseUrl+'/petclinic/owners') 

    cy.get('tbody').within($tbody => {
      cy.get('tr').last().within($tr => {
        cy.get('td')
          .eq(0)
            .should('contain','2005/01/06')
        cy.get('td')
          .eq(1)
            .should('contain','Some description for testing')
      } )
    })

});
