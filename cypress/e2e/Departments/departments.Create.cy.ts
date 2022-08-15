describe("Create Department", () => {
  before(() => {
    cy.login("zed.saheer5@gmail.com", "12345678");
    cy.visit("/Departments");
  });
  it("should return error message if name is less than 2 chars", () => {
    // Arrange
    let message = cy.getBySel("toastMessage").should("be.ok");
    let createDepartmentBtn = cy
      .getBySel("createDepartmentBtn")
      .should("be.ok");
    // Act
    createDepartmentBtn.click();
    cy.getBySel("departmentName").type("n");
    cy.getBySel("addNewDepartmentBtn").click({ force: true }).wait(1000);
    // Assert
    message = cy
      .get(".Toastify")
      .contains(
        "Department team name should contains at least 2 char, and max 61 chars."
      )
      .should("be.ok");
  });
});
