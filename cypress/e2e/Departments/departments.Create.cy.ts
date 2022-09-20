before(function () {
  cy.login("zed.saheer5@gmail.com", "12345678");
  cy.visit("/Departments").wait(1000);
});

describe("Create Department", () => {
  // open the Departments page and open create Department modal before all cases.
  beforeEach(function () {
    let createDepartmentBtn = cy.getBySel("create-dep-button");
    createDepartmentBtn.click({ force: true }).wait(100);
  });
  it("should return toast message : department name is less than 2 chars", () => {
    cy.getBySel("create-dep-Name").type("n");
    cy.getBySel("create-dep-submit").click().wait(100);
    cy.get(".Toastify")
      .contains(`"Department Name" length must be at least 2 characters long`)
      .should("be.ok");
    cy.getBySel("create-dep-close-modal").click({
      force: true,
    });
  });

  it("should have a disabled addTeam btn, if chars is less than 2 chars", () => {
    cy.getBySel("create-dep-teamName").type("t").wait(500);
    cy.getBySel("create-dep-add-team").should("have.class","disabled");
    cy.getBySel("create-dep-close-modal").click({
      force: true,
    });
  });

  it("should have a diabled=false addTeam button, if chars is more than 2 chars", () => {
    cy.getBySel("create-dep-teamName").type("team").wait(500);
    cy.getBySel("create-dep-add-team").should(
      "not.have.attr",
      "disabled",
      "disabled"
    );
    cy.getBySel("create-dep-close-modal").click({
      force: true,
    });
  });

  it("shouldn't have duplicated names in teams", () => {
    cy.getBySel("create-dep-Name").type("Automated Department");
    cy.getBySel("create-dep-teamName").type("team");
    cy.getBySel("create-dep-add-team").click().wait(200);
    cy.getBySel("create-dep-teamName").type("team");
    cy.getBySel("create-dep-add-team").click().wait(200);
    cy.getBySel("create-dep-submit")
      .click()
      .wait(200)
      .then(() => {
        cy.get(".Toastify").should(
          "contain.text",
          `"department teams" contains a duplicate value`
        );
      });
    cy.getBySel("create-dep-close-modal").click({
      force: true,
    });
  });

  it("should create deparmtent in list, and toast a message", () => {
    cy.getBySel("create-dep-Name").type("Automated Department");
    cy.getBySel("create-dep-teamName").type("Automated Team - 1").wait(200);
    cy.getBySel("create-dep-add-team").click().wait(200);
    cy.getBySel("create-dep-teamName").type("Automated Team - 2").wait(200);
    cy.getBySel("create-dep-add-team").click().wait(200);
    cy.getBySel("create-dep-submit")
      .click()
      .wait(4000)
      .then(() => {
        cy.get(".Toastify")
          .contains("Department created successfully")
          .should("be.ok");
        cy.getBySelLike("departments-card-").then((items) => {
          expect(items[items.length - 1]).to.contain.text("Automated Department");
        });
      });
    cy.getBySel("create-dep-close-modal").click({
      force: true,
      multiple: true,
    });
    // we can also use cy.getBySelLike("").eq(0/1/2 index) or cy.getBySelLike("").each((item,index)=>{ cy.wrap(item).should()})
  });
});
