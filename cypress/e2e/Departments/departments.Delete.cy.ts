before(function () {
  cy.login("zed.saheer5@gmail.com", "12345678");
  cy.visit("/Departments").wait(3000);
  cy.getTasks().then((res) => cy.wrap(res.body).as("tasks"));
  cy.getDepartments()
    .then((res) => {
      cy.wrap(res.body).as("departments");
      cy.wrap(`departments-card-${res.body[res.body.length - 1]._id}`).as(
        "deleteDepartment"
      );
    })
  cy.get<string>("@deleteDepartment").then((deleteDepartment) => {
    cy.getBySel(deleteDepartment)
      .should("be.ok")
      .within(() => cy.getBySel("open-department-toggler").click().wait(200));
    let deleteDepartmentBtn = cy
      .getBySel("delete-department-btn")
      .should("be.ok");
    deleteDepartmentBtn.click().wait(500);
  });
});

describe("Delete Department", function () {
    beforeEach(function () {
      cy.wrap(this.deleteDepartment).as("deleteDepartment");
    });

  it("Should cancel delete department", () => {
    cy.getBySel("delete-department-popup").should("be.visible");
    cy.getBySel("delete-department-cancel").click().wait(500);
    cy.getBySel("delete-department-popup").should("not.be.visible");
  });

  it("should delete department", () => {
    cy.get<string>("@deleteDepartment").then((deleteDepartment) => {
      cy.getBySel(deleteDepartment)
        .should("be.ok")
        .within(() => cy.getBySel("open-department-toggler").click().wait(200));
      let deleteDepartmentBtn = cy
        .getBySel("delete-department-btn")
        .should("be.ok");
      deleteDepartmentBtn.click().wait(500);
      cy.getBySel("delete-dep-button").click().wait(3000);
      cy.getBySel(deleteDepartment).should("not.exist");
    });
  });
});

/* after(() => {
  cy.login("zed.saheer5@gmail.com", "12345678");
  cy.deleteAllDepartments().then((res) =>
    cy.wrap(res.status).should("eq", 200)
  );
  cy.visit("/");
}); */
