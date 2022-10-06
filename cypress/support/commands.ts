// @ts-check
///<reference path="../global.d.ts" />
import apiUrl from "../../src/services/api.json";
const url =
  process.env.NODE_ENV === "development"
    ? apiUrl.API_DEV_URL
    : apiUrl.API_BASE_URL;

import "cypress-file-upload";
import { CypressSelector } from "cypress/global";
import { mount } from "cypress/react";
import { Project } from "src/types/models/Projects";

Cypress.Commands.add("mount", mount);

Cypress.Commands.add("login", (email: string, password: string) => {
  cy.request({
    method: "POST",
    url: "http://localhost:5000/api/signIn",
    body: {
      email: email,
      password: password,
    },
  }).then(({ body }) => {
    window.localStorage.setItem("token", body?.token);
    window.localStorage.setItem("id", body?._id);
    return { id: body?.id, token: body?.token };
  });
});

Cypress.Commands.add("getTasks", () => {
  return cy.request({
    method: "GET",
    url: `${url}getTasks`,
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  });
});

Cypress.Commands.add("getDepartments", () => {
  return cy.request({
    method: "GET",
    url: `${url}getDeps`,
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  });
});

Cypress.Commands.add("getUsers", () => {
  return cy.request({
    method: "GET",
    url: `${url}getUsers`,
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  });
});

Cypress.Commands.add("deleteAllDepartments", () =>
  cy.request({
    method: "DELETE",
    url: `${url}dropTestCollection`,
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  })
);

Cypress.Commands.add("getClients", () => {
  cy.request({
    method: "GET",
    url: `${url}getAllClients`,
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  });
});

Cypress.Commands.add("getAllProjects", () => {
  cy.request({ method: "GET", url: `${url}getProject` });
});

Cypress.Commands.add("deleteAllProjects", () => {
  cy.request({
    method: "DELETE",
    url: `${url}deleteProjects`,
    body: {},
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  });
});

Cypress.Commands.add("createAutomatedProject", () => {
  let projectResult: Cypress.Response<Project>;
  let project = cy.getUsers().then((users) => {
    let pms = users.body.filter((item) => item.role === "PM");
    cy.getClients().then((clients) => {
      cy.request({
        method: "POST",
        url: `${url}createProject`,
        body: {
          name: "Automated project",
          projectManager: pms[0]._id,
          projectManagerName: pms[0].name,
          clientId: clients.body[0]._id,
          numberOfFinishedTasks: 0,
          numberOfTasks: 0,
          projectStatus: "Not Started",
          completedDate: null,
          adminId: localStorage.getItem("id"),
        },
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      }).then((result) => {
        projectResult = result;
      });
    });
    return projectResult;
  });
  return project;
});

Cypress.Commands.add("getByTestId", (selector, ...args) => {
  return cy.get(`[data-test-id="${selector}"]`, ...args);
});

Cypress.Commands.add("getByTestIdLike", (selector, ...args) => {
  return cy.get(`[data-test-id*="${selector}"]`, ...args);
});

Cypress.Commands.add("getByDataAttr", (selector: CypressSelector, ...args) => {
  return cy.get(`[${selector.name}="${selector.value}"]`, ...args);
});

Cypress.Commands.add("getByClassName", (selector, ...args) => {
  return cy.get(`.${selector}`, ...args);
});

Cypress.Commands.add("getByAriaLabel", (selector, ...args) => {
  return cy.get(`aria-label="${selector}"`, ...args);
});

Cypress.Commands.add("getByAriaLabelLike", (selector, ...args) => {
  return cy.get(`aria-label*="${selector}"`);
});
