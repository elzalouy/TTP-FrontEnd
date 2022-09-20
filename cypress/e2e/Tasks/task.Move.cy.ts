before(function () {
  cy.login("zed.saheer5@gmail.com", "12345678");
  cy.visit("/Projects");
  
  let projects = cy.getBySelLike("projects-row-name-");

  projects
    .within((items) => {
      cy.wrap(items).getBySel("projects-row-NoOfTasks-").not("0/0");
    })
    .click()
    .wait(500);
});
describe("Move Task", () => {
  it("should open tasks board view", () => {});
});
