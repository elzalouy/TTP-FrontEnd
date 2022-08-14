/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable {
      /**
       * Custom command to automate the steps of login
       * @example cy.login(email:string,password:string)
       */
      login(email:string,password:string): Chainable<Element>;
    }
  }