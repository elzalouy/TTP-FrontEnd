// @ts-check
///<reference path="../global.d.ts" />

import { mount } from "cypress/react";
import { Task } from "../../src/interfaces/models/Projects";

Cypress.Commands.add("mount", mount);
Cypress.Commands.add("login", (email: any, password: any) => {
  cy.request({
    method: "POST",
    url: "http://localhost:5000/api/signIn",
    body: {
      email: email,
      password: password,
    },
  }).then(({ body, status }) => {
    window.localStorage.setItem("token", body?.token);
    window.localStorage.setItem("id", body?._id);
    cy.visit("/");
  });
});
Cypress.Commands.add("getTasks", () => {
  return cy.request({
    method: "GET",
    url: "http://localhost:5000/api/getTasks",
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  });
});
Cypress.Commands.add("getDepartments", () => {
  return cy.request({
    method: "GET",
    url: "http://localhost:5000/api/getDeps",
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  });
});
Cypress.Commands.add("deleteAllDepartments", () =>
  cy.request({
    method: "DELETE",
    url: "http://localhost:5000/api/dropTestCollection",
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  })
);
Cypress.Commands.add("getBySel", (selector, ...args) => {
  return cy.get(`[data-test-id="${selector}"]`, ...args);
});
Cypress.Commands.add("getBySelLike", (selector, ...args) => {
  return cy.get(`[data-test-id*="${selector}"]`, ...args);
});
Cypress.Commands.add("getByName", (selector, ...args) => {
  return cy.get(`input[name=${selector}]`, ...args);
});
