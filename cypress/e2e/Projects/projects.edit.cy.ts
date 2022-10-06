import moment from "moment";
import { Project } from "src/types/models/Projects";

describe("Edit project", () => {
  beforeEach(function () {
    let { id, token } = cy.login("zed.saheer5@gmail.com", "12345678");
    cy.createAutomatedProject().then((res) => {
      cy.wrap<Project>(res.body).as("testingProject");
    });
    cy.wrap<string>(id).as("userId");
    cy.wrap<string>(token).as("token");
    cy.visit("/Projects").wait(100);
    cy.get<Project>("@testingProject").then((project) => {
      cy.getByTestId(`projects-row-dot-icon-${project._id}`).click().wait(100);
      cy.getByTestId(`projects-edit-project-btn-${project._id}`).click({
        force: true,
      });
    });
  });
  afterEach(() => {
    cy.deleteAllProjects();
  });
  after(() => {
    cy.deleteAllProjects();
  });
  it("it should have at least 4 chars", () => {
    cy.getByTestId("edit-project-name-input").clear().type("a");
    cy.getByTestId("edit-project-submit-btn").click().wait(100);
    cy.getByTestId("edit-project-name-input").should(
      "have.attr",
      "data-error",
      "true"
    );
  });

  it("it may have a start and due date", () => {
    let date = moment(new Date()).format("MMM D, YYYY");
    cy.getByTestId("edit-project-name-input")
      .clear()
      .type("automated editing testing");
    cy.getByTestId("edit-project-date-input").click().wait(100);
    cy.get(`[aria-label="${date}"]`).click().wait(100);
    cy.getByTestId("edit-project-due-date-input").click().wait(100);
    cy.get(`[aria-label="${date}"]`).click().wait(100);
    cy.getByTestId("edit-project-submit-btn").click().wait(1000);
    // Automated edited testing
  });
});
