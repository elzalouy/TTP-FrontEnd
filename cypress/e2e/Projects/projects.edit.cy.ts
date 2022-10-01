before(function () {
  let { id, token } = cy.login("zed.saheer5@gmail.com", "12345678");
  cy.wrap<string>(id).as("userId");
  cy.wrap<string>(token).as("token");
  cy.visit("/Projects").wait(100);
  cy.getAllProjects().then((res) => {
    cy.wrap(res).as("projects");
    cy.wrap(res.body[0]._id).as("projectId");
    cy.get<string>("@projectId").then((res) => {
      cy.getBySel(`projects-row-dot-icon-${res}`).click().wait(100);
      cy.getBySel(`projects-edit-project-btn-${res}`).click({ force: true });
    });
  });
});

describe("Edit project", () => {
  it("it should have at least 4 chars", () => {
    cy.getBySel("edit-project-name-input").clear().type("a");
    cy.getBySel("edit-project-submit-btn").click().wait(100);
    cy.getBySel("edit-project-name-input").should(
      "have.attr",
      "data-error",
      "true"
    );
    // Automated edited testing
  });
  it("it may have a start and due date", () => {
    // let date = moment(new Date()).format("MM DD, YYYY");
    cy.getBySel("edit-project-name-input")
      .clear()
      .type("automated editing testing");
    cy.getBySel("edit-project-date-input").click().wait(100);
    cy.getBySel("edit-project-submit-btn").click().wait(100);
    cy.getBySel("edit-project-name-input").should(
      "have.attr",
      "data-error",
      "true"
    );
    // Automated edited testing
  });
});
