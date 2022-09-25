before(function () {
  cy.login("zed.saheer5@gmail.com", "12345678");
  cy.visit("/Projects").wait(100);
  let createProjectBtn = cy.getBySel("create-project");
  createProjectBtn.click().wait(200);
});
describe("Create project", () => {
  it("it should fail if project name is less than 4 chars", () => {
    cy.getBySel("create-project-name").type("a");
    cy.getBySel("submit-create-project").click().wait(100);
    cy.get(".Toastify")
      .contains(`Project name length should be Min 4 chars`)
      .should("be.ok");
  });
  it("it should fail if project manager didn't selected", () => {
    cy.getBySel("create-project-name").type("automated testing");
    cy.getBySel("submit-create-project").click().wait(100);
    cy.getBySelName({ name: "data-error", value: "true" }).within((current) => {
      cy.getBySel("create-project-pm-select").should("be.ok");
    });
    // cy.get(".Toastify").contains(``).should("be.ok");
  });
});
