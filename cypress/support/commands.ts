/// <reference types="cypress" />
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
  })
});
