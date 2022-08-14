beforeEach(() => {
  cy
    .login("zed.saheer5@gmail.com", "12345678")
})

describe('Tasks', () => {
  it('It should create a project and open it', () => {
    cy
      .visit('/projects')
      .get('[data-test="create-project"]')
      .click()
      .get('input[id$=project-name]').type('Automated')
      .get('div[id=client-new-project]').click().get('.Option').contains("Testing").click()
      .get('div[id=pm-new-project]').click().get('.Option').contains("Saif").click()
      .get('button').contains('Next').click()
      .get('.closeIconProject').click().wait(2000)
      .get('tr').contains('Automated').click()
      .url().should('include', '/TasksBoard')
  })

  it('It should open a project and create a task', () => {
    cy
      .visit('/projects')
      .get('tr').contains('Automated').click()
      .url().should('include', '/TasksBoard')
  })

  it('It should move the task to done', () => {
    cy
      .visit('/projects')
      .get('tr').contains('Automated').click()
      .url().should('include', '/TasksBoard')
  })

  it('It delete the task', () => {
    cy
      .visit('/projects')
      .get('tr').contains('Automated').click()
      .url().should('include', '/TasksBoard')
  })

  it('It should delete the project', () => {
    cy
      .visit('/projects')
      .get('tr')
      .contains('Automated')
      .get('[data-test="project-actions"]')
      .click()
      .get('button[id=delete-project-button]')
      .click()
      .get('tr').should('not.have.text','Automated')
  })
})