/// <reference types="cypress" />
import { mount } from "cypress/react";
import { IDepartmentsSlice } from "../src../types/models/Departments";
import { Project, Task as ProjectTask } from "../src/types/models/Projects";
import { IDepartmentState } from "../src/types/models/Departments";
import { User } from "src/types/models/user";
import { Client } from "src/models/Clients/clients.state";
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
      loginBySM(): { id: string; token: string };
      loginByOM(): { id: string; token: string };
      loginByPM(): { id: string; token: string };
      getTasks(): Chainable<Cypress.Response<IDepartmentsSlice[]>>;
      getDepartments(): Chainable<Cypress.Response<IDepartmentState[]>>;
      deleteAllDepartments(): Chainable<Cypress.Response<string>>;
      getAllProjects(): Chainable<Cypress.Response<Project[]>>;
      createAutomatedProject(): Chainable<Cypress.Response<Project>>;
      getUsers(): Chainable<Cypress.Response<User[]>>;
      getClients(): Chainable<Cypress.Response<Client[]>>;
      deleteAllProjects(): Chainable<
        Cypress.Response<{ deletedCount: number }>
      >;
      /**
       * getByTestId
       *
       *  yields elements with a data-test attribute that match a specified selector.
       */
      getByTestId(
        dataTestAttribute: string,
        args?: any
      ): Chainable<JQuery<HTMLElement>>;

      /**
       *  getByTestIdLike
       *
       *  yields elements with a data-test attribute that contains a specified selector.
       */

      getByTestIdLike(
        dataTestPrefixAttribute: string,
        args?: any
      ): Chainable<JQuery<HTMLElement>>;

      getByAriaLabel(
        ariaLabelString: string,
        args?: any
      ): Chainable<JQuery<HTMLElement>>;

      getByAriaLabelLike(
        ariaLabelString: string,
        args?: any
      ): Chainable<JQuery<HTMLElement>>;

      getByClassName(
        classNameString: string,
        args?: any
      ): Chainable<JQuery<HTMLElement>>;

      getByDataAttr(
        data: CypressSelector,
        args?: any
      ): Chainable<JQuery<HTMLElement>>;
    }
  }
}
