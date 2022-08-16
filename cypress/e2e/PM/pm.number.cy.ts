beforeEach(() => {
    cy.login("zed.saheer5@gmail.com", "12345678");
    cy.visit('/ProjectManagers')
});


describe('Check Project count of PM', () => {
    it('should create a new PM',()=>{
        cy.get('[data-test-id="create-pm-button"]').click();
        cy.get('[data-test-id="pm-name"]').type("Automated PM");
        cy.get('[data-test-id="pm-email"]').type("pm@gmail.com");
        cy.get('[data-test-id="submit-pm"]').click();
    })

    it('should create a new project',()=>{
        cy.visit('/projects');
        cy.get('[data-test-id="create-project"]').click();
        cy.get('input[id$=project-name]').type('Automated Project');
        cy.get('div[id=client-new-project]').click().get('.Option').first().click();
        cy.get('div[id=pm-new-project]').click().get('.Option').first().click();
        cy.get('input[name="startDate"]').click();
        cy.get('.cell').contains('1').click();
        cy.get('input[name="deadline"]').click();
        cy.get('.cell').contains('20').click();
        cy.get('button').contains('Next').click();
        cy.get('.closeIconProject').click().wait(2000);
        cy.get('tr').contains('Automated Project').click();
        cy.url().should('include', '/TasksBoard');
    })
});

describe('Check change in Project count of PM', () => {
    it('should delete the PM',()=>{
        cy.wait(2000).get('tr').contains('tr','Automated PM').within(()=>{
            return cy.get('[data-test-id="delete-pm-button"]').click();
        });
        cy.get('[data-test-id="delete-pm-button"]').first().click();
        cy.get('tr').should('not.have.text', 'Automated PM');
    })
}) 
