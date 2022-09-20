beforeEach(() => {
  cy.login("zed.saheer5@gmail.com", "12345678");
  cy.visit('/projects');
});

describe("Create Task", () => {
  it('It should create a project and open it', () => {
    cy.visit('/projects');
    cy.get('[data-test-id="create-project"]').click();
    cy.get('[data-test-id="create-project-name"]').type('Automated Project');
    cy.get('[data-test-id="create-project-client-select"]').click().wait(1000).get('[data-test-id="create-project-client-select-option"]').contains('Automated Client').click({ force: true });
    cy.get('[data-test-id="create-project-pm-select"]').click().wait(1000).get('[data-test-id="create-project-pm-select-option"]').first().click({ force: true });
    cy.get('button').contains('Next').click();
    cy.get('.closeIconProject').click().wait(2000);
    cy.get('tr').contains('Automated Project').click();
    cy.url().should('include', '/TasksBoard');
  })

  it("It should open a project and create a task", () => {
    cy.get("tr").contains("Automated").wait(1000).click();
    cy.url().should("include", "/TasksBoard");
    cy.get(".add-new-task").click().wait(500);
    cy.get("input[id$=task-name]").first().type("Automated Task");
    cy.get("div[id=department-new-task]")
      .click()
      .get(".Option")
      .first()
      .click();
    cy.get("div[id=category-new-task]").click().get(".Option").first().click();
    cy.get(".addTaskBtn").first().click().wait(1000);
    cy.get(".task-card").contains("Automated Task").should("be.visible");
  });
});

describe("Edit Task", () => {
  it('It should edit the name of the task', () => {
    cy.wait(1000).get('tr').contains('Automated Project').should('be.visible').click();
    cy.url().should('include', '/TasksBoard');
    cy.get('.task-card').contains('Automated Task').wait(2500).click();
    cy.get("input[id$=edit-task-name]").clear().type("Automated Task Updated");
    cy.get('[data-test-id="edit-task-button"]').click().wait(1000);
    cy.get(".task-card").contains("Automated Task Updated").should("be.visible");
  })
})

describe("Delete Task", () => {

  it('It should delete the task', () => {
    cy.wait(1000).get('tr').contains('Automated Project').should('be.visible').click();
    cy.url().should('include', '/TasksBoard');
    cy.get('.task-card').contains('Automated Task Updated').siblings('div').click();
    cy.get('button[id=delete-task-button]').click();
    cy.get('[data-test-id="delete-task-button-confirm"]').click().wait(500);
    cy.get('[data-test-id="task-card-container"]').should('not.have.text', 'Automated Task Updated');
  })

  it('It should delete the project', () => {
    cy.get('tr').contains('tr', 'Automated Project').within(() => {
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
    cy.get('input[id$=project-name]').type('Automated Project');
    cy.get('div[id=client-new-project]').click().get('.Option').first().click();
    cy.get('div[id=pm-new-project]').click().get('.Option').first().click();
    cy.get('button').contains('Next').click();
    cy.get('.closeIconProject').click().wait(2000);
    cy.get('tr').contains('Automated Project').click();
    cy.url().should('include', '/TasksBoard');
  })

  it("It should open a project and create a task with image attachment", () => {
    cy.get("tr").contains("Automated").wait(1000).click();
    cy.url().should("include", "/TasksBoard");
    cy.get(".add-new-task").click().wait(500);
    cy.get("input[id$=task-name]").first().type("Automated Task With Attachment");
    cy.get("div[id=department-new-task]")
      .click()
      .get(".Option")
      .first()
      .click();
    cy.get("div[id=category-new-task]").click().get(".Option").first().click();
    cy.get('[data-test-id="task-file"]').first().attachFile('batman.png').wait(1000);
    cy.get(".addTaskBtn").first().click().wait(1000);
    cy.get(".task-card").contains("Automated Task").should("be.visible");
  });

  it('It should delete the task', () => {
    cy.wait(1000).get('tr').contains('Automated Project').should('be.visible').click();
    cy.url().should('include', '/TasksBoard');
    cy.get('.task-card').contains('Automated Task').siblings('div').click();
    cy.get('button[id=delete-task-button]').click();
    cy.get('[data-test-id="delete-task-button-confirm"]').click().wait(500);
    cy.get('[data-test-id="task-card-container"]').should('not.have.text', 'Automated Task');
  })

  it('It should delete the project', () => {
    cy.get('tr').contains('tr', 'Automated Project').within(() => {
      return cy.get('.project-actions > h3').click()
    });
    cy.get('button[id=delete-project-button]').click()
    cy.get('.controllers-delete').first().click();
    cy.get('tr').should('not.have.text', 'Automated Project');
  })
});

describe("Edit Task with Attachment", () => {
  it('It should edit the name of the task', () => {
    cy.wait(1000).get('tr').contains('Automated Project').should('be.visible').click();
    cy.url().should('include', '/TasksBoard');
    cy.get('.task-card').contains('Automated Task With Attachment').wait(2500).click();
    cy.get("input[id$=edit-task-name]").clear().type("Automated Task With Attachment Updated");
    cy.get('[data-test-id="edit-task-button"]').click().wait(1000);
    cy.get(".task-card").contains("Automated Task With Attachment Updated").should("be.visible");
  })
})