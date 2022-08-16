import { should } from "chai";

describe("Create Department", () => {
  // open the Departments page and open create Department modal before all cases.
  before(() => {
    cy.log(Cypress.env("OM_USER_EMAIL"));
    cy.login("zed.saheer5@gmail.com", "12345678");
    cy.visit("/Departments").wait(1000);
    let createDepartmentBtn = cy.getBySel("createDepartmentBtn");
    createDepartmentBtn.click().wait(1000);
  });

  it("should return toast message : department name is less than 2 chars", () => {
    cy.getBySel("create-dep-Name").type("n");
    cy.getBySel("create-dep-submit").click().wait(1000);
    cy.get(".Toastify")
      .contains(
        "Department team name should contains at least 2 char, and max 61 chars."
      )
      .should("be.ok");
  });

  it("should have a disabled addTeam btn, if chars is less than 2 chars", () => {
    cy.getBySel("create-dep-teamName").type("t").wait(500);
    cy.getBySel("create-dep-add-team").should(
      "have.attr",
      "disabled",
      "disabled"
    );
  });

  it("should have a diabled=false addTeam button, if chars is more than 2 chars", () => {
    cy.getBySel("create-dep-teamName").type("team").wait(500);
    cy.getBySel("create-dep-add-team").should(
      "not.have.attr",
      "disabled",
      "disabled"
    );
  });
  it("shouldn't have duplicated names in teams", () => {
    cy.getBySel("create-dep-Name").type("department test case");
    cy.getBySel("create-dep-teamName").type("team");
    cy.getBySel("create-dep-add-team").click().wait(200);
    cy.getBySel("create-dep-teamName").type("team");
    cy.getBySel("create-dep-add-team").click().wait(200);
    cy.getBySel("create-dep-submit").click();
    cy.get(".Toastify")
      .contains("Department teams should have a unique names")
      .should("be.ok");
  });
  it("should create deparmtent in list, and toast a message", () => {
    cy.getBySel("create-dep-Name").type("department test case");
    cy.getBySel("create-dep-teamName").type("team").wait(200);
    cy.getBySel("create-dep-add-team").click().wait(200);
    cy.getBySel("create-dep-teamName").type("team 2").wait(200);
    cy.getBySel("create-dep-add-team").click().wait(200);
    cy.getBySel("create-dep-submit").click().wait(4000);
    cy.get(".Toastify")
      .contains("Department created successfully")
      .should("be.ok");
    cy.getBySelLike("departments-card-").then((items) => {
      expect(items[items.length - 1]).to.contain.text("department test case");
    });
    // we can also use cy.getBySelLike("").eq(0/1/2 index) or cy.getBySelLike("").each((item,index)=>{ cy.wrap(item).should()})
  });
});
