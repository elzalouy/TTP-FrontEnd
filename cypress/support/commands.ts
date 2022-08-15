// @ts-check
///<reference path="../global.d.ts" />

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })

import { mount } from "cypress/react";

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
Cypress.Commands.add("getBySel", (selector, ...args) => {
  return cy.get(`[data-test="${selector}"]`, ...args);
});
Cypress.Commands.add("getBySelLike", (selector, ...args) => {
  return cy.get(`[data-test*="${selector}"]`, ...args);
});
