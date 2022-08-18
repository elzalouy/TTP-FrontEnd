/// <reference types="cypress" />
import { mount } from "cypress/react";
import { IDepartmentsSlice } from "../src/interfaces/models/Departments";
import { Task as ProjectTask } from "../src/interfaces/models/Projects";
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to automate the steps of login
       * @example cy.login()
       */
      mount: typeof mount;
      login(name: string, password: string);
      getTasks(): Chainable<Cypress.Response<IDepartmentsSlice[]>>;
      getDepartments(): Chainable<Cypress.Response<ProjectTask[]>>;
      deleteAllDepartments(): Chainable<Cypress.Response<string>>;
      /**
       * getBySel
       *
       *  yields elements with a data-test attribute that match a specified selector.
       */
      getBySel(
        dataTestAttribute: string,
        args?: any
      ): Chainable<JQuery<HTMLElement>>;
      /**
       *  getBySelLike
       *
       *  yields elements with a data-test attribute that contains a specified selector.
       */
      getBySelLike(
        dataTestPrefixAttribute: string,
        args?: any
      ): Chainable<JQuery<HTMLElement>>;
      getByName(byname: string, args?: any): Chainable<JQuery<HTMLElement>>;
    }
  }
}
