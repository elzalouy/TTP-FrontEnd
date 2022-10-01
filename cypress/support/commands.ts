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

Cypress.Commands.add("deleteAllDepartments", () =>
  cy.request({
    method: "DELETE",
    url: `${url}dropTestCollection`,
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  })
);
Cypress.Commands.add("getAllProjects", () => {
  cy.request({ method: "GET", url: `${url}getProject` });
});

Cypress.Commands.add("getBySel", (selector, ...args) => {
  return cy.get(`[data-test-id="${selector}"]`, ...args);
});
Cypress.Commands.add("getBySelName", (selector: CypressSelector, ...args) => {
  return cy.get(`[${selector.name}="${selector.value}"]`, ...args);
});
Cypress.Commands.add("getBySelLike", (selector, ...args) => {
  return cy.get(`[data-test-id*="${selector}"]`, ...args);
});

Cypress.Commands.add("getByName", (selector, ...args) => {
  return cy.get(`input[name=${selector}]`, ...args);
});
