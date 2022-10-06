import moment from "moment";

describe("Create project", () => {
  beforeEach(function () {
    cy.login("zed.saheer5@gmail.com", "12345678");
    cy.visit("/Projects").wait(100);
    let createProjectBtn = cy.getByTestId("create-project");
    createProjectBtn.click().wait(200);
  });

  it("it should fail if project name is less than 4 chars", () => {
    cy.getByTestId("create-project-name").type("a");
    cy.getByTestId("submit-create-project").click().wait(100);
    cy.getByClassName("Toastify").should(
      "contain.text",
      "Project name length should be Min 4 chars"
    );
  });

  it("it should fail if project manager wasn't selected", () => {
    cy.getByTestId("create-project-name").clear().type("automated testing");
    cy.getByTestId("submit-create-project").click().wait(100);
    cy.getByDataAttr({ name: "data-error", value: "true" }).within(
      (current) => {
        cy.getByTestId("create-project-pm-select").should("be.ok");
      }
    );
  });

  it("it should fail if client wasn't selected", () => {
    cy.getByTestId("create-project-name").clear().type("automated testing");
    cy.getByTestId("create-project-pm-select")
      .click()
      .getByTestId("create-project-pm-select-option")
      .first()
      .click();
    cy.getByTestId("submit-create-project").click().wait(100);
    cy.getByDataAttr({ name: "data-error", value: "true" }).within(
      (current) => {
        cy.getByTestId("create-project-client-select").should("be.ok");
      }
    );
  });
  it("it should open another popup for creating tasks once the project has been created", () => {
    cy.getByTestId("create-project-name").clear().type("automated testing");
    cy.getByTestId("create-project-pm-select")
      .click()
      .getByTestId("create-project-pm-select-option")
      .first()
      .click();
    cy.getByTestId("create-project-client-select").click().wait(100);
    cy.getByTestId("create-project-client-select-option")
      .first()
      .click({ force: true });
    cy.getByTestId("submit-create-project").click().wait(1000);
    cy.getByTestId("projects-create-project-task-form").should("be.visible");
  });
  it("it should create a project in inProgress list, with  dates", function () {
    let date = moment(new Date()).format("MMM D, YYYY");
    cy.getByTestId("create-project-name").clear().type("automated testing");
    cy.getByTestId("create-project-pm-select")
      .click()
      .getByTestId("create-project-pm-select-option")
      .first()
      .click();
    cy.getByTestId("create-project-client-select").click().wait(100);
    cy.getByTestId("create-project-client-select-option")
      .first()
      .click({ force: true });
    cy.getByTestId("create-project-date-input").click().wait(100);
    cy.get(`[aria-label="${date}"]`).click().wait(100);
    cy.getByTestId("create-project-due-input").click().wait(100);
    cy.get(`[aria-label="${date}"]`).click().wait(100);
    cy.getByTestId("submit-create-project").click().wait(1000);
    cy.getByTestId("projects-create-project-task-form").should("be.visible");
  });
  // cy.getByClassName("Toastify").contains(``).should("be.ok");

  after(() => {
    cy.deleteAllProjects();
  });
});
