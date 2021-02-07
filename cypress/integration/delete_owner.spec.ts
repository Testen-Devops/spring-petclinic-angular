it('deletes owner', () => {
  cy.visit('/');
  //TODO: save owners name to make sure its not present anymore after deletion!
  cy.contains('Owners').click();
  cy.contains('All').click();
  cy.get('td a').first().click();
  cy.contains('Delete Owner').click();
  // TODO: check if $owner.name is not present anymore.
});
