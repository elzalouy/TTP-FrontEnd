beforeEach(() => {
  cy.login("zed.saheer5@gmail.com", "12345678");
  cy.visit('/projects');
});

describe("Create Task", () => {
  it('It should create a project and open it', () => {
    cy.get('[data-test-id="create-project"]').click();
    cy.get('[data-test-id="create-project-name"]').type('Automated Project');
    cy.get('[data-test-id="create-project-client-select"]').click().wait(1000).get('[data-test-id="create-project-client-select-option"]').first().click({ force: true });
    cy.get('[data-test-id="create-project-pm-select"]').click().wait(1000).get('[data-test-id="create-project-pm-select-option"]').first().click({ force: true });
    cy.get('button').contains('Next').click();
    cy.get('.closeIconProject').click().wait(2000);
    cy.get('tr').contains('Automated Project').click();
    cy.url().should('include', '/TasksBoard');
  })

  it("It should open a project and create a task", () => {
    cy.wait(2000).get("tr").contains("Automated Project").click();
    cy.url().should("include", "/TasksBoard");
    cy.get(".add-new-task").click().wait(500);
    cy.get('[data-test-id="create-task-name"]').first().type("Automated Task");
    cy.get('[data-test-id="create-task-dep-select"]').click().wait(1000).get('[data-test-id="create-task-dep-select-option"]').first().click({ force: true });
    cy.get('[data-test-id="create-task-cat-select"]').click().wait(1000).get('[data-test-id="create-task-cat-select-option"]').first().click({ force: true });
    cy.get('[data-test-id="create-task-submit"]').first().click().wait(1000);
    cy.get(".task-card").contains("Automated Task").should("be.visible");
  });
});

describe("Edit Task", () => {
  it('It should edit the name of the task', () => {
    cy.wait(2000).get('tr').contains('Automated Project').should('be.visible').click();
    cy.url().should('include', '/TasksBoard');
    cy.get('.task-card').contains('Automated Task').click();
    cy.get('[data-test-id="edit-task-name"]').clear().type("Automated Task Updated");
    cy.get('[data-test-id="edit-task-submit"]').click();
    cy.wait(3000).get(".task-card").contains("Automated Task Updated").should("be.visible");
  })
})

describe("Delete Task", () => {
  it('It should delete the task', () => {
    cy.wait(2000).get('tr').contains('Automated Project').should('be.visible').click();
    cy.url().should('include', '/TasksBoard');
    cy.get('.task-card').contains('Automated Task Updated').siblings('div').click();
    cy.get('button[id=delete-task-button]').click();
    cy.get('[data-test-id="delete-task-button-confirm"]').click().wait(500);
    cy.get('[data-test-id="task-card-container"]').should('not.have.text', 'Automated Task Updated');
  })

  it('It should delete the project', () => {
    cy.wait(2000).get('tr').contains('tr', 'Automated Project').within(() => {
      return cy.get('.project-actions > h3').click()
    });
    cy.get('button[id=delete-project-button]').click()
    cy.get('.controllers-delete').first().click();
    cy.get('tr').should('not.have.text', 'Automated Project');
  })
});


describe("Create Task with Attachment Image", () => {
  it('It should create a project and open it', () => {
    cy.get('[data-test-id="create-project"]').click();
    cy.get('[data-test-id="create-project-name"]').type('Automated Project');
    cy.get('[data-test-id="create-project-client-select"]').click().wait(1000).get('[data-test-id="create-project-client-select-option"]').first().click({ force: true });
    cy.get('[data-test-id="create-project-pm-select"]').click().wait(1000).get('[data-test-id="create-project-pm-select-option"]').first().click({ force: true });
    cy.get('button').contains('Next').click();
    cy.get('.closeIconProject').click().wait(2000);
    cy.get('tr').contains('Automated Project').click();
    cy.url().should('include', '/TasksBoard');
  })

  it("It should open a project and create a task with image attachment", () => {
    cy.wait(2000).get("tr").contains("Automated Project").click();
    cy.url().should("include", "/TasksBoard");
    cy.get(".add-new-task").click().wait(500);
    cy.get('[data-test-id="create-task-name"]').first().type("Automated Task With Attachment");
    cy.get('[data-test-id="create-task-dep-select"]').click().wait(1000).get('[data-test-id="create-task-dep-select-option"]').first().click({ force: true });
    cy.get('[data-test-id="create-task-cat-select"]').click().wait(1000).get('[data-test-id="create-task-cat-select-option"]').first().click({ force: true });
    cy.get('[data-test-id="project-task-file"]').first().attachFile('batman.png').wait(1000);
    cy.get('[data-test-id="create-task-submit"]').first().click().wait(1000);
    cy.get(".task-card").contains("Automated Task With Attachment").should("be.visible");
  });
});

describe("Edit Task with Attachment", () => {
  it('It should edit the name of the task', () => {
    cy.wait(2000).get('tr').contains('Automated Project').should('be.visible').click();
    cy.url().should('include', '/TasksBoard');
    cy.get('.task-card').contains('Automated Task With Attachment').click();
    cy.get('[data-test-id="edit-task-name"]').clear().type("Automated Task With Attachment Updated");
    cy.get('[data-test-id="edit-task-submit"]').click();
    cy.wait(3000).get(".task-card").contains("Automated Task With Attachment Updated").should("be.visible");
  })

  it('it should update the form by adding a PDF file to the task',()=>{
     cy.wait(2000).get('tr').contains('Automated Project').should('be.visible').click();
    cy.url().should('include', '/TasksBoard');
    cy.get('.task-card').contains('Automated Task With Attachment').click();
    cy.get('[data-test-id="project-task-file"]').first().attachFile('test.pdf').wait(1000);
    cy.get('[data-test-id="edit-task-submit"]').click();
    cy.wait(3000).get(".task-card").contains("Automated Task With Attachment Updated").should("be.visible");
  }) 

    it('It should delete the task', () => {
    cy.wait(2000).get('tr').contains('Automated Project').should('be.visible').click();
    cy.url().should('include', '/TasksBoard');
    cy.get('.task-card').contains('Automated Task With Attachment').siblings('div').click();
    cy.get('button[id=delete-task-button]').click();
    cy.get('[data-test-id="delete-task-button-confirm"]').click().wait(500);
    cy.get('[data-test-id="task-card-container"]').should('not.have.text', 'Automated Task With Attachment');

  })

  it('It should delete the project', () => {
     cy.wait(2000).get('tr').contains('tr', 'Automated Project').within(() => {
      return cy.get('.project-actions > h3').click()
    });
    cy.get('button[id=delete-project-button]').click()
    cy.get('.controllers-delete').first().click();
    cy.get('tr').should('not.have.text', 'Automated Project');
  })
})