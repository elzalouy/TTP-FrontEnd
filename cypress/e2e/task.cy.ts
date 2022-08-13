

//USE CUSTOM COMMAND LOGIN

describe('Task : Move to Done', () => {
  it('Create Project', () => {
    cy
      .login()
      .visit('/projects')
      .get('[data-test="create-project"]')
      .click()
      .get('input[id$=project-name]').type('Automated')
      .get('div[id=client-new-project]').click().get('.Option').contains("Testing").click()
      .get('div[id=pm-new-project]').click().get('.Option').contains("Saif").click()
      .get('button').contains('Next').click()
      .get('.closeIconProject').click().wait(1000)
      .get('tr').contains('Automated').click()
      .url().should('include', '/TasksBoard')
  })
})
