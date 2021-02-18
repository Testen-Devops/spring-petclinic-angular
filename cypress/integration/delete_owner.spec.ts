it('deletes owner', () => {
  cy.visit('/');
  cy.contains('Owners').click();
  cy.contains('All').click();

  var ownersName;
  cy.get('td a').first().then(($firstOwner) => {

    ownersName = $firstOwner.text();
  }).click()

  cy.contains('Delete Owner').click();

  cy.url().should('equal', Cypress.config().baseUrl+'/petclinic/owners') 

  cy.get('td a').first().then(($nextOwner) => {
    expect($nextOwner.text()).to.not.equal(ownersName)
  })

});