  it('deletes owner', () => {
    cy.visit('/');
    cy.contains('Owners')
      .click();
    cy.contains('All')
      .click();

    // save owners name for comparison
    var ownersName;
    cy.get('td a')
      .first()
      .then(($firstOwner) => {
        ownersName = $firstOwner.text();  
        })
        .click()

    cy.contains('Delete Owner')
      .click();

    cy.url() 
      .should('equal', Cypress.config().baseUrl+'/petclinic/owners') 

    // check if deleted owner is not in list anymore
    cy.get('td a')
      .first()
        .then(($nextOwner) => {
          expect($nextOwner
          .text())
          .to.not.equal(ownersName)
        })

  });