//USE CUSTOM COMMAND LOGIN
import "cypress";
describe("Tasks", () => {
  beforeAll(() => {
    cy.login(Cypress.env("PM_USER_EMAIL"), Cypress.env("PM_USER_PASSWORD"));
  });

  // Arrange - Act - Assert (X) wrong implementation here.
  it("Create Project", () => {
    cy.visit("/projects")
      .get('[data-test="create-project"]')
      .click()
      .get("input[id$=project-name]")
      .type("Automated")
      .get("div[id=client-new-project]")
      .click()
      .get(".Option")
      .contains("Testing")
      .click()
      .get("div[id=pm-new-project]")
      .click()
      .get(".Option")
      .contains("Saif")
      .click()
      .get("button")
      .contains("Next")
      .click()
      .get(".closeIconProject")
      .click()
      .wait(1000)
      .get("tr")
      .contains("Automated")
      .click()
      .url()
      .should("include", "/TasksBoard");
  });
});
