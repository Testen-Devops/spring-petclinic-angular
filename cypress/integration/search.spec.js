it('should add  show appropriate search results', () => {
  cy.visit('/');
  cy.get('input')
    .type('Davis');

  cy.get('button')
    .contains('Submit')
    .click()

  cy.get('h3').contains('Betty Davis');
  cy.get('h3').contains('Harold Davis');
})