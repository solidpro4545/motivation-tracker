/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to login using provided email and password
     * @example cy.login('demo@tracker.com', 'demo123')
     */
    login(email: string, password: string): Chainable<void>;
  }
}
