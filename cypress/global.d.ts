/// <reference types="cypress" />
import { mount } from "cypress/react";
import { IDepartmentsSlice } from "../src../types/models/Departments";
import { Project, Task as ProjectTask } from "../src/types/models/Projects";
import { IDepartmentState } from "../src/types/models/Departments";
export type CypressSelector = {
  name: string;
  value: string;
};

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to automate the steps of login
       * @example cy.login(email:"example@mail.com",password:"12345678")
       */
      mount: typeof mount;
      login(name: string, password: string): { id: string; token: string };
      getTasks(): Chainable<Cypress.Response<IDepartmentsSlice[]>>;
      getDepartments(): Chainable<Cypress.Response<IDepartmentState[]>>;
      deleteAllDepartments(): Chainable<Cypress.Response<string>>;
      getAllProjects(): Chainable<Cypress.Response<Project[]>>;
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
       * getByMultiSel
       *
       *  yields elements with multi data attributes that match a specified selector.
       */

      getBySelName(
        data: CypressSelector,
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
