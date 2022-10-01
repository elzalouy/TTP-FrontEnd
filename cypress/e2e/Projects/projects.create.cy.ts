describe("Create project", () => {
  beforeEach(function () {
    cy.login("zed.saheer5@gmail.com", "12345678");
    cy.visit("/Projects").wait(100);
    let createProjectBtn = cy.getBySel("create-project");
    createProjectBtn.click().wait(200);
  });

  it("it should fail if project name is less than 4 chars", () => {
    cy.getBySel("create-project-name").type("a");
    cy.getBySel("submit-create-project").click().wait(100);
    cy.get(".Toastify").should(
      "contain.text",
      "Project name length should be Min 4 chars"
    );
  });

  it("it should fail if project manager wasn't selected", () => {
    cy.getBySel("create-project-name").clear().type("automated testing");
    cy.getBySel("submit-create-project").click().wait(100);
    cy.getBySelName({ name: "data-error", value: "true" }).within((current) => {
      cy.getBySel("create-project-pm-select").should("be.ok");
    });
  });

  it("it should fail if client wasn't selected", () => {
    cy.getBySel("create-project-name").clear().type("automated testing");
    cy.getBySel("create-project-pm-select")
      .click()
      .getBySel("create-project-pm-select-option")
      .first()
      .click();
    cy.getBySel("submit-create-project").click().wait(100);
    cy.getBySelName({ name: "data-error", value: "true" }).within((current) => {
      cy.getBySel("create-project-client-select").should("be.ok");
    });
  });
  it("it should open another popup for creating tasks once the project has been created", () => {
    cy.getBySel("create-project-name").clear().type("automated testing");
    cy.getBySel("create-project-pm-select")
      .click()
      .getBySel("create-project-pm-select-option")
      .first()
      .click();
    cy.getBySel("create-project-client-select").click().wait(100);
    cy.getBySel("create-project-client-select-option")
      .first()
      .click({ force: true });
    cy.getBySel("submit-create-project").click().wait(1000);
    cy.getBySel("projects-create-project-task-form").should("be.visible");
  });

  // cy.get(".Toastify").contains(``).should("be.ok");
});
