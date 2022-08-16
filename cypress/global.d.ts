/// <reference types="cypress" />
import { mount } from "cypress/react";
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to automate the steps of login
       * @example cy.login()
       */
      mount: typeof mount;
      login(name: string, password: string);

      /**
       * getBySel yields elements with a data-test attribute that match a specified selector.
       */
      getBySel(
        dataTestAttribute: string,
        args?: any
      ): Chainable<JQuery<HTMLElement>>;
      /**
       *  getBySelLike yields elements with a data-test attribute that contains a specified selector.
       */
      getBySelLike(
        dataTestPrefixAttribute: string,
        args?: any
      ): Chainable<JQuery<HTMLElement>>;
      getByName(byname: string, args?: any): Chainable<JQuery<HTMLElement>>;
    }
  }
}
