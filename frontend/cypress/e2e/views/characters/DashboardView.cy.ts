describe('DashboardView', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.visitHash('/characters')
  })
  it('gets data from API', () => {
    cy.dataCy('characters-container').children().should('have.length.at.least', 1)
  })

  it('Filters character by name when typing in the search bar', () => {
    cy.dataCy('search-bar').type('Rick')
    cy.dataCy('characters-container').children().should('have.length.at.least', 1)
    cy.dataCy('characters-container').children().children().should('include.text', 'Rick')
  })

  it('Filters character by filter button', () => {
    cy.dataCy('filter-button').click()
    cy.dataCy('species-select').click()
    cy.dataCy('species-human').click()
    cy.dataCy('submit-button').click()
    cy.dataCy('characters-container').children().should('include.text', 'Species: Human')
  })
})
