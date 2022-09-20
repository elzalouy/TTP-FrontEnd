beforeEach(() => {
    cy.login("zed.saheer5@gmail.com", "12345678");
    cy.visit('/ProjectManagers')
});


describe('Check Project count of PM', () => {
    it('It should create a new PM', () => {
        cy.get('[data-test-id="create-pm-button"]').click();
        cy.get('[data-test-id="create-pm-name"]').type("Automated PM");
        cy.get('[data-test-id="create-pm-email"]').type("pm@gmail.com");
        cy.get('[data-test-id="create-pm-submit"]').click().wait(1000);
    })

    it('It should show inital number of projects for the PM', () => {
        cy.wait(4000).get('tr').contains('tr', 'Automated PM').within(() => {
            return cy.get('[data-test-id="number-inprogress-pm"]').should("have.text", "0");
        });
    })

    it('It should create a new project with same PM', () => {
        cy.visit('/projects');
        cy.get('[data-test-id="create-project"]').click();
        cy.get('[data-test-id="create-project-name"]').type('Automated Project');
        cy.get('[data-test-id="create-project-client-select"]').click().wait(1000).get('[data-test-id="create-project-client-select-option"]').first().click({ force: true });
        cy.get('[data-test-id="create-project-pm-select"]').click().wait(1000).get('[data-test-id="create-project-pm-select-option"]').contains('Automated PM').click({ force: true });
        cy.get('[data-test-id="start-date"]').click();
        cy.get('[role="cell"]').contains('1').click();
        cy.get('[data-test-id="deadline"]').click();
        cy.get('[role="cell"]').contains('20').click();
        cy.get('button').contains('Next').click();
        cy.get('.closeIconProject').click().wait(2000);
        cy.get('tr').contains('Automated Project').click();
        cy.url().should('include', '/TasksBoard');
    })
});

describe('Check change in Project count of PM', () => {
    it('It should show change in number of project in PM', () => {
        cy.wait(2000).get('tr').contains('tr', 'Automated PM').within(() => {
            return cy.get('[data-test-id="number-inprogress-pm"]').should("have.text", "1");
        });
    })

    it('It should delete the PM', () => {
        cy.wait(2000).get('tr').contains('tr', 'Automated PM').within(() => {
            return cy.get('[data-test-id="delete-pm-button"]').click();
        });
        cy.get('[data-test-id="delete-pm-button"]').first().click();
        cy.get('tr').should('not.have.text', 'Automated PM');
    })

    it('It should delete the project', () => {
        cy.visit('/projects');
        cy.wait(1000).get('tr').contains('tr', 'Automated Project').within(() => {
            return cy.get('.project-actions > h3').click()
        });
        cy.get('button[id=delete-project-button]').click()
        cy.get('.controllers-delete').first().click();
        cy.get('tr').should('not.have.text', 'Automated Project');
    })
}) 
