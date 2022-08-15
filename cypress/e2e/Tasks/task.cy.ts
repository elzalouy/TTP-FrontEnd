beforeEach(() => {
  cy.login("zed.saheer5@gmail.com", "12345678");
});

describe("Tasks", () => {
  /* it('It should create a project and open it', () => {
        cy.visit('/projects');
        cy.get('[data-test-id="create-project"]').click();
        cy.get('input[id$=project-name]').type('Automated Project');
        cy.get('div[id=client-new-project]').click().get('.Option').first().click();
        cy.get('div[id=pm-new-project]').click().get('.Option').first().click();
        cy.get('button').contains('Next').click();
        cy.get('.closeIconProject').click().wait(2000);
        cy.get('tr').contains('Automated Project').click();
        cy.url().should('include', '/TasksBoard');
    }) */

  it("It should open a project and create a task", () => {
    cy.visit("/projects");
    cy.get("tr").contains("Automated").wait(1000).click();
    cy.url().should("include", "/TasksBoard");
    cy.get(".add-new-task").click().wait(500);
    cy.get("input[id$=task-name]").type("Automated Task");
    cy.get("div[id=department-new-task]")
      .click()
      .get(".Option")
      .first()
      .click();
    cy.get("div[id=category-new-task]").click().get(".Option").first().click();
    cy.get(".addTaskBtn").first().click().wait(1000);
    cy.get("p")
      .contains("p", "Automated Task")
      .should("have.text", "Automated Task");
  });

  /*   it('It should move the task to done', () => {
         cy.visit('/projects');
          cy.get('tr').contains('Automated Project').wait(1000).click();
          cy.url().should('include', '/TasksBoard');
      })
  
      it('It should delete the task', () => {
          cy.visit('/projects');
          cy.get('tr').contains('Automated Project').wait(1000).click();
          cy.url().should('include', '/TasksBoard');
      })  */

  /*    it('It should delete the project', () => {
             cy.visit('/projects')
             cy.get('tr').contains('tr', 'Automated Project').within(() => {
                 return cy.get('.project-actions > h3').click()
             });
             cy.get('button[id=delete-project-button]').click()
             cy.get('.controllers-delete').first().click();
             cy.get('tr').should('not.have.text', 'Automated Project');
         })  */
});
