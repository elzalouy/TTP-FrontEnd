/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable {
      /**
       * Custom command to automate the steps of login
       * @example cy.login()
       */
      login(): Chainable<Element>;
    }
  }