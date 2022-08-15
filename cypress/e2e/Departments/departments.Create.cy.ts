describe("Create Department", () => {
  // open the Departments page and open create Department modal before all cases.
  before(() => {
    cy.login("zed.saheer5@gmail.com", "12345678");
    cy.visit("/Departments").wait(1000);
    let createDepartmentBtn = cy.getBySel("createDepartmentBtn");
    createDepartmentBtn.click().wait(1000);
  });

  it("should return toast message : department name is less than 2 chars", () => {
    cy.getBySel("departmentName").type("n");
    cy.getBySel("addNewDepartmentBtn").click({ force: true }).wait(1000);
    cy.get(".Toastify")
      .contains(
        "Department team name should contains at least 2 char, and max 61 chars."
      )
      .should("be.ok");
  });
  it("should have a disabled addTeam btn, if chars is less than 2 chars", () => {
    cy.getBySel("departmentTeam").type("t").wait(500);
    cy.getBySel("addTeamBtn").should("have.attr", "disabled", "disabled");
  });
  it("should have a diabled=false addTeam button, if chars is more than 2 chars", () => {
    cy.getBySel("departmentTeam").type("team").wait(500);
    cy.getBySel("addTeamBtn").should("not.have.attr", "disabled", "disabled");
  });
});
