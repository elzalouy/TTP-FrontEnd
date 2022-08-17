// @ts-check
///<reference path="../global.d.ts" />

import { mount } from "cypress/react";
import 'cypress-file-upload';

Cypress.Commands.add("mount", mount);
Cypress.Commands.add("login", (email: string, password: string) => {
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
Cypress.Commands.add("getBySel", (selector, ...args) => {
  return cy.get(`[data-test-id="${selector}"]`, ...args);
});
Cypress.Commands.add("getBySelLike", (selector, ...args) => {
  return cy.get(`[data-test-id*="${selector}"]`, ...args);
});
Cypress.Commands.add("getByName", (selector, ...args) => {
  return cy.get(`input[name=${selector}]`, ...args);
});
