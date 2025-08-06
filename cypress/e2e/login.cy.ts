describe('Login Page', () => {
  const email = 'demo@tracker.com';
  const password = 'demo123';

  it('logs in successfully with valid credentials', () => {
    cy.login(email, password);
    cy.url().should('include', '/tracker');
    cy.title().should('include', 'Motivation Tracker');
  });
});
