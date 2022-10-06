before(function () {
  cy.login("zed.saheer5@gmail.com", "12345678");
  cy.visit("/Departments").wait(1000);
});

describe("Create Department", () => {
  // open the Departments page and open create Department modal before all cases.
  beforeEach(function () {
    let createDepartmentBtn = cy.getByTestId("create-dep-button");
    createDepartmentBtn.click({ force: true }).wait(100);
  });
  it("should return toast message : department name is less than 2 chars", () => {
    cy.getByTestId("create-dep-Name").type("n");
    cy.getByTestId("create-dep-submit").click().wait(100);
    cy.getByClassName("Toastify")
      .contains(`"Department Name" length must be at least 2 characters long`)
      .should("be.ok");
    cy.getByTestId("create-dep-close-modal").click({
      force: true,
    });
  });

  it("should have a disabled addTeam btn, if chars is less than 2 chars", () => {
    cy.getByTestId("create-dep-teamName").type("t").wait(500);
    cy.getByTestId("create-dep-add-team").should("have.class", "disabled");
    cy.getByTestId("create-dep-close-modal").click({
      force: true,
    });
  });

  it("should have a diabled=false addTeam button, if chars is more than 2 chars", () => {
    cy.getByTestId("create-dep-teamName").type("team").wait(500);
    cy.getByTestId("create-dep-add-team").should(
      "not.have.attr",
      "disabled",
      "disabled"
    );
    cy.getByTestId("create-dep-close-modal").click({
      force: true,
    });
  });

  it("shouldn't have duplicated names in teams", () => {
    cy.getByTestId("create-dep-Name").type("Automated Department");
    cy.getByTestId("create-dep-teamName").type("team");
    cy.getByTestId("create-dep-add-team").click().wait(200);
    cy.getByTestId("create-dep-teamName").type("team");
    cy.getByTestId("create-dep-add-team").click().wait(200);
    cy.getByTestId("create-dep-submit")
      .click()
      .wait(200)
      .then(() => {
        cy.getByClassName("Toastify").should(
          "contain.text",
          `"department teams" contains a duplicate value`
        );
      });
    cy.getByTestId("create-dep-close-modal").click({
      force: true,
    });
  });

  it("should create deparmtent in list, and toast a message", () => {
    cy.getByTestId("create-dep-Name").type("Automated Department");
    cy.getByTestId("create-dep-teamName").type("Automated Team - 1").wait(200);
    cy.getByTestId("create-dep-add-team").click().wait(200);
    cy.getByTestId("create-dep-teamName").type("Automated Team - 2").wait(200);
    cy.getByTestId("create-dep-add-team").click().wait(200);
    cy.getByTestId("create-dep-submit")
      .click()
      .wait(4000)
      .then(() => {
        cy.getByClassName("Toastify")
          .contains("Department created successfully")
          .should("be.ok");
        cy.getByTestIdLike("departments-card-").then((items) => {
          expect(items[items.length - 1]).to.contain.text(
            "Automated Department"
          );
        });
      });
    cy.getByTestId("create-dep-close-modal").click({
      force: true,
      multiple: true,
    });
    // we can also use cy.getByTestIdLike("").eq(0/1/2 index) or cy.getByTestIdLike("").each((item,index)=>{ cy.wrap(item).should()})
  });
});
