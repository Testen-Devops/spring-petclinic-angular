it('should add related to a vet and show all visits of vet', () => {
  cy.visit('/');
  cy.contains('Owners').click();
  cy.contains('All').click();
  cy.contains('Peter McTavish').click();
  cy.contains('Add Visit').click();
  cy.get('input[name=date]')
    .type('2005/01/06')

  cy.get('input[name=description]')
    .type('Some description for testing')
    
  cy.get('select[name=vet]')
    .select('Sharon Jenkins')

    cy.contains('Add Visit').click();

    cy.contains('Sharon Jenkins').first().click({force: true})
    cy.url().should('contain', Cypress.config().baseUrl+'/petclinic/vets/') 

    cy.get('tbody').within($tbody => {
      cy.get('tr').last().within($tr => {
        cy.get('td')
          .first()
            .should('contain','2005/01/06')
        cy.get('td')
          .eq(1)
            .should('contain','Some description for testing')
      } )
    })

});