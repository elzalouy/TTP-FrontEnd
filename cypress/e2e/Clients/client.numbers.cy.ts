beforeEach(() => {
    cy.login("zed.saheer5@gmail.com", "12345678");
    cy.visit('/Clients');
});

describe("Check Inital numbers in client", () => {
    it('It should create a new client', () => {
        cy.get('[data-test-id="create-client-button"]').click().wait(1000);
        cy.get('[data-test-id="create-client-name"]').wait(500).type('Automated Client');
        cy.get('[data-test-id="create-client-submit-button"]').click();
        cy.get('[data-test-id="client-name-header"]').within(() => {
            return cy.contains('Automated Client').should('be.visible');
        })
    })

    it('It should have no active projects', () => {
        cy.get('[data-test-id="client-card"]').within(() => {
            return cy.contains('div[data-test-id="client-card"]', 'Automated Client').within(() => {
                cy.get('[data-test-id="active-projects-clients"]').should('have.text', '0');
            })
        })
    })

    it('It should create a new project with the same client', () => {
        cy.visit('/projects');
        cy.get('[data-test-id="create-project"]').click();
        cy.get('[data-test-id="create-project-name"]').type('Automated Project');
        cy.get('[data-test-id="create-project-client-select"]').click().wait(1000).get('[data-test-id="create-project-client-select-option"]').contains('Automated Client').click({ force: true });
        cy.get('[data-test-id="create-project-pm-select"]').click().wait(1000).get('[data-test-id="create-project-pm-select-option"]').first().click({ force: true });
        cy.get('[data-test-id="start-date"]').click();
        cy.get('[role="cell"]').contains('1').click();
        cy.get('[data-test-id="deadline"]').click();
        cy.get('[role="cell"]').contains('20').click();
        cy.get('button').contains('Next').click();
        cy.get('.closeIconProject').click().wait(2000);
        cy.get('tr').contains('Automated Project').click();
        cy.url().should('include', '/TasksBoard');
    })
})

describe("Check change in numbers of client", () => {

    it('It should show change in active projects', () => {
        cy.get('[data-test-id="client-card"]').within(() => {
            return cy.contains('div[data-test-id="client-card"]', 'Automated Client').within(() => {
                cy.get('[data-test-id="active-projects-clients"]').should('have.text', '1');
            })
        })
    })

    it('It should delete the client', () => {
        cy.get('[data-test-id="client-card"]').within(() => {
            cy.contains('div[data-test-id="client-card"]', 'Automated Client').within(() => {
                cy.get('[data-test-id="client-actions"]').click();
            })
        });
        cy.get('[data-test-id="client-delete-button"]').click();
        cy.get('[data-test-id="delete-client-button-confirm"]').click();
        cy.get('[data-test-id="client-card"]').within(() => {
            return cy.contains('div[data-test-id="client-card"]', 'Automated Client').should('not.have.text', 'Automated Client');
        })
    })

    it('It should delete the project', () => {
        cy.visit('/projects');
        cy.wait(2000).get('tr').contains('tr', 'Automated Project').within(() => {
            return cy.get('.project-actions > h3').click()
        });
        cy.get('button[id=delete-project-button]').click()
        cy.get('.controllers-delete').first().click();
        cy.get('tr').should('not.have.text', 'Automated Project');
    })
})