it('deletes owner', () => {
  cy.visit('/');
  //TODO: save owners name to make sure its not present anymore after deletion!
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


  // TODO: check if $owner.name is not present anymore.
});
